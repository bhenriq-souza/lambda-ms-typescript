import { HelloMessageResult } from './hello.interfaces';

export class HelloService {
    public constructor() { }

    public sayHallo(name: string): Promise<HelloMessageResult> {
        return new Promise((resolve: (message: HelloMessageResult) => void, reject: (reson: string) => void): void => {
            if (!name) {
                reject('Name not provided!');
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