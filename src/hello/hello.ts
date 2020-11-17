import { ApiHandler } from '../shared/interfaces/api';

import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

const service: HelloService = new HelloService();

const controller: HelloController = new HelloController(service);

// Functions
export const sayHello: ApiHandler = controller.sayHello;
