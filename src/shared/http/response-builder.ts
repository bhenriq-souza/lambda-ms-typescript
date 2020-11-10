import { ApiCallback, ApiResponse, ErrorResponseBody } from "../interfaces/api";
import { HttpStatusCode } from "./status-codes";
import { BadRequestResult, ErrorResult, InternalServerErrorResult } from "../errors/types";
import { ErrorCode } from "../errors/codes";
import { ErrorMessage } from "../errors/messages";

export class ResponseBuilder {
    private static _returnAs<T>(result: T, statusCode: number, callback: ApiCallback): void {
        const bodyObject: ErrorResponseBody | T = result instanceof ErrorResult
            ? { error: result }
            : result;

        const response: ApiResponse = {
            body: JSON.stringify(bodyObject),
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            statusCode
        };

        callback(undefined, response);
    }

    public static ok<T>(result: T, callback: ApiCallback): void {
        ResponseBuilder._returnAs(result, HttpStatusCode.Ok, callback);
    }

    public static badRequest(code: string, description: string, callback: ApiCallback): void {
        const errorResult: BadRequestResult = new BadRequestResult(code, description);
        ResponseBuilder._returnAs<BadRequestResult>(errorResult, HttpStatusCode.BadRequest, callback);
    }

    public static internalServerError(error: Error, callback: ApiCallback): void {
        const errorResult: InternalServerErrorResult = new InternalServerErrorResult(ErrorCode.GeneralError, ErrorMessage[ErrorCode.GeneralError]);
        ResponseBuilder._returnAs<InternalServerErrorResult>(errorResult, HttpStatusCode.InternalServerError, callback);
    }
}