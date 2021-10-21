import { logLevels } from './levels';

// tslint:disable: no-console
// tslint:disable-next-line: no-default-export
export class Logger {

  public constructor(private readonly _target: string) { }

  public error = (time: string, message: string): void => {
    console.error(this.buildLogMsg(logLevels.ERROR, time, message));
  }

  public info = (time: string, message: string): void => {
    console.info(this.buildLogMsg(logLevels.INFO, time, message));
  }

  private readonly buildLogMsg = (level: string, time: string, message: string): string => `${time} - ${level}: ${message} - ${this._target}`;

}
