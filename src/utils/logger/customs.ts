import { ErrorResult } from '../../shared/errors/types';
import { ApiEvent } from '../../shared/interfaces/api';

import { Logger } from './';

// tslint:disable: no-unsafe-any
// tslint:disable-next-line: no-default-export
export default class {
  private readonly _logger: Logger;

  public constructor(
    target: string,
    private _initTime: string
  ) {
    this._logger = new Logger(target);
    this._initTime = '';
  }

  public requestFailureEnd(error: ErrorResult): void {
    const msg: string = `Request finalized with error ${error.code} - ${error.description}`;

    this._logger.error((new Date()).toISOString(), msg);
  }

  public requestReceived(evt: ApiEvent): void {
    this._initTime = (new Date()).toISOString();
    const msg: string = `${evt.httpMethod} request received`;

    this._logger.info(this._initTime, msg);
  }

  public requestSuccessEnd(evt: ApiEvent): void {
    const init: number = new Date(this._initTime).getTime();
    const now: Date = new Date();
    const runTime: number = now.getTime() - init;
    const msg: string = `${evt.httpMethod} request finalized with success in ${runTime}ms`;

    this._logger.info(now.toISOString(), msg);
  }
}
