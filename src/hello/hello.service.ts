
export class HelloService {
    public constructor() { }

    public sayHallo(name: string): Promise<string> {
        return new Promise((resolve: (message: string) => void, reject: (reson: string) => void): void => {
            if (!name) {
                reject('Name not provided!');
            }
            resolve(`Say hello to ${name}`);
        });
    }
}