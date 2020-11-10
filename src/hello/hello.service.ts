import { HelloMessageResult } from './hello.interfaces';
import { BadRequestResult } from '../shared/errors/types';

export class HelloService {
    public constructor() { }

    public sayHallo(name: string): Promise<HelloMessageResult> {
        return new Promise((resolve: (message: HelloMessageResult) => void, reject: (reson: BadRequestResult) => void): void => {           
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