import { ApiEvent } from '../../shared/interfaces/api';
import { ErrorResult } from '../../shared/errors/types';
import { Logger } from './';

export default class {
  private _logger: Logger;
  private _initTime: string;

  public constructor(target: string) {
    this._logger = new Logger(target);
    this._initTime = '';
  }

  public requestReceived(evt: ApiEvent): void {
    this._initTime = (new Date()).toISOString();
    const msg: string = `${evt.httpMethod} request received`;

    this._logger.info(this._initTime, msg, evt.pathParameters);
  }

  public requestSuccessEnd(evt: ApiEvent): void {
    const init: number = new Date(this._initTime).getTime();
    const now: Date = new Date();
    const runTime: number = now.getTime() - init;
    const msg: string = `${evt.httpMethod} request finalized with success in ${runTime}ms`;

    this._logger.info(now.toISOString(), msg, {});
  }

  public requestFailureEnd(error: ErrorResult): void {
    const msg: string = `Request finalized with error ${error.code} - ${error.description}`;

    this._logger.error((new Date()).toISOString(), msg, error);
  }
}