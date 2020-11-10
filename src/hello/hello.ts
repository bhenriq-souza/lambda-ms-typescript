import { ApiHandler } from '../shared/interfaces/api';
import { HelloService } from './hello.service';
import { HelloController } from './hello.controller';

const service: HelloService = new HelloService();
const controller: HelloController = new HelloController(service);

// functions
export const sayHello: ApiHandler = controller.sayHello;