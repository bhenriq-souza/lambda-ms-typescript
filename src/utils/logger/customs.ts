import { InfoCode } from '../../shared/info/codes';
import { InfoMessageReplacers } from '../../shared/info/message.replacers';
import { InfoMessage } from '../../shared/info/messages';

import { ErrorCode } from '../../shared/errors/codes';
import { ErrorMessageReplacers } from '../../shared/errors/message.replacers';
import { ErrorMessage } from '../../shared/errors/messages';
import { ErrorResult } from '../../shared/errors/types';

import { ApiEvent } from '../../shared/interfaces/api';

import { Logger } from './';

// tslint:disable: no-unsafe-any
// tslint:disable-next-line: no-default-export
export default class {
  private readonly _logger: Logger;

  public constructor(target: string) {
    this._logger = new Logger(target);
  }

  public requestFailureEnd(error: ErrorResult): void {
    const msg: string = ErrorMessage[ErrorCode.RequestFailed]
                          .replace(ErrorMessageReplacers.HttpErrorCode, error.code)
                          .replace(ErrorMessageReplacers.ErrorDescription, error.description);

    this._logger.error(this._logger.timerEnd(), msg);
  }

  public requestReceived(evt: ApiEvent): void {
    const start: string = this._logger.timerStart();
    const msg: string = InfoMessage[InfoCode.RequestReceived]
                          .replace(InfoMessageReplacers.HttpMethod, evt.httpMethod);

    this._logger.info(start, msg);
  }

  public requestSuccessEnd(evt: ApiEvent): void {
    const end: string = this._logger.timerEnd();
    const runTime: number = this._logger.timerDiff();
    const msg: string = InfoMessage[InfoCode.RequestSuccess]
                          .replace(InfoMessageReplacers.HttpMethod, evt.httpMethod)
                          .replace(InfoMessageReplacers.RequestTime, runTime.toString());

    this._logger.info(end, msg);
  }
}
