import { ApiHandler, ApiEvent, ApiContext, ApiCallback } from '../shared/interfaces/api';
import { ResponseBuilder } from '../shared/http/response-builder';
import { ErrorCode } from '../shared/errors/codes';
import { ErrorMessage } from '../shared/errors/messages';
import { ErrorResult } from '../shared/errors/types';
import { CustomLogger } from '../utils/logger';

import { HelloMessageResult } from './hello.interfaces';
import { HelloService } from './hello.service';

export class HelloController {
    public constructor(private readonly _service: HelloService) { }

    public sayHello: ApiHandler = (evt: ApiEvent, ctx: ApiContext, cb: ApiCallback): void => {
        
        const logger = new CustomLogger(evt.path);
        logger.requestReceived(evt);
        
        if (!evt.pathParameters || !evt.pathParameters.name) {
            return ResponseBuilder.badRequest(ErrorCode.MissingName, ErrorMessage[ErrorCode.MissingName], cb);
        }

        const name: string = evt.pathParameters && evt.pathParameters.name || '';

        this._service.sayHallo(name)
            .then((msg: HelloMessageResult) => {
                logger.requestSuccessEnd(evt);
                ResponseBuilder.ok<HelloMessageResult>(msg, cb);
            })
            .catch((error: ErrorResult) => {
                logger.requestFailureEnd(error);
                ResponseBuilder.internalServerError(error, cb);
            });
    }
}