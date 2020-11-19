import { logLevels } from './levels';

// tslint:disable: no-console
// tslint:disable-next-line: no-default-export
export class Logger {
  private _end: string;
  private _start: string;

  public constructor(private readonly _target: string) {
    this._end = '';
    this._start = '';
  }

  public error = (time: string, message: string): void => {
    console.error(this.buildLogMsg(logLevels.ERROR, time, message));
  }

  public info = (time: string, message: string): void => {
    console.info(this.buildLogMsg(logLevels.INFO, time, message));
  }

  public timerDiff = (): number => {

    if (!this._start) {
      this._start = (new Date()).toISOString();
    }

    if (!this._end) {
      this._end = (new Date()).toISOString();
    }

    const start: number = (new Date(this._start)).getTime();
    const end: number = (new Date(this._end)).getTime();

    return end - start;
  }

  public timerEnd = (): string => {
    this._end = (new Date()).toISOString();
    return this._end;
  }

  public timerStart = (): string => {
    this._start = (new Date()).toISOString();
    return this._start;
  }

  private readonly buildLogMsg = (level: string, time: string, message: string): string => `${time} - ${level}: ${message} - ${this._target}`;

}
