import { default as LogLevels } from './levels';

export default class {

  public constructor(private readonly _target: string) { }

  public info(time: string, message: string, data: any = {}) {
    console.info(this.buildLogMsg(LogLevels.INFO, time, message, data));
  }

  public error(time: string, message: string, data: any = {}) {
    console.error(this.buildLogMsg(LogLevels.ERROR, time, message, data));
  }

  private buildLogMsg(level: string, time: string, message: string, data: any = {}): string {
    return `${time} - ${level}: ${message} - ${this._target}`
      + `${Object.entries(data).length > 0 ? ` - ${JSON.stringify(data)}` : '' }`;
  }
}