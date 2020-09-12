import { HelloService } from './hello.service';
import { ApiHandler, ApiEvent, ApiContext, ApiCallback } from 'shared/api.interfaces';
import { ResponseBuilder } from 'shared/response-builder';
import { ErrorCode } from 'shared/error-codes';
import { ErrorResult } from 'shared/errors';

export class HelloController {
    public constructor(private readonly _service: HelloService) { }

    public sayHello: ApiHandler = (evt: ApiEvent, ctx: ApiContext, cb: ApiCallback): void => {
        if (!evt.pathParameters || !evt.pathParameters.name) {
            return ResponseBuilder.badRequest(ErrorCode.MissingName, 'Name is required', cb);
        }

        const name: string = evt.pathParameters && evt.pathParameters.name || '';

        this._service.sayHallo(name)
            .then((msg: string) => ResponseBuilder.ok<string>(msg, cb))
            .catch((error: ErrorResult) => ResponseBuilder.internalServerError(error, cb));
    }
}