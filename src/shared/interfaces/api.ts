// tslint:disable-next-line: no-implicit-dependencies
import { APIGatewayEvent, Context, ProxyCallback, ProxyResult } from 'aws-lambda';

import { ErrorResult } from '../errors/types';

export type ApiCallback = ProxyCallback;
export type ApiContext = Context;
export type ApiEvent = APIGatewayEvent;
export type ApiHandler = (event: APIGatewayEvent, context: Context, callback: ApiCallback) => void;
export type ApiResponse = ProxyResult;

export interface ErrorResponseBody {
    error: ErrorResult;
}
