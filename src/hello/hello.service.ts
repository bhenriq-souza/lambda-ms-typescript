import { HelloMessageResult } from './hello.interfaces';
export class HelloService {

    // tslint:disable-next-line: prefer-function-over-method
    public sayHallo(name: string): Promise<HelloMessageResult> {
        return new Promise(
            (resolve: (message: HelloMessageResult) => void): void => {
                const result: HelloMessageResult = {
                    message: {
                        name,
                        text: `Say hello to ${name}`,
                    }
                };
                resolve(result);
        });
    }
}
