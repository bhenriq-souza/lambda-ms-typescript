import { HelloMessageResult } from './hello.interfaces';
import { BadRequestResult } from '../shared/errors';
import { ErrorCode } from '../shared/error-codes';

export class HelloService {
    public constructor() { }

    public sayHallo(name: string): Promise<HelloMessageResult> {
        return new Promise((resolve: (message: HelloMessageResult) => void, reject: (reson: BadRequestResult) => void): void => {
            if (!name) {
                reject(new BadRequestResult(ErrorCode.MissingName, 'Name not provided!'));
            }

            const result: HelloMessageResult = {
                message: {
                    name,
                    text: `Say hello to ${name}`,
                }
            }

            resolve(result);
        });
    }
}