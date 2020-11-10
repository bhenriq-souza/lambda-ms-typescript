
import { ApiContext, ApiEvent, ApiHandler, ApiResponse, ErrorResponseBody } from '../src/shared/interfaces/api';
import { ApiErrorResponseParsed, ApiResponseParsed, PathParameter } from './test.interfaces';

type SuccessCaller = <T> (handler: ApiHandler, pathParameters?: PathParameter) => Promise<ApiResponseParsed<T>>;
type FailureCaller = <T> (handler: ApiHandler, pathParameters?: PathParameter) => Promise<ApiErrorResponseParsed>;

export const callSuccess: SuccessCaller = <T> (handler: ApiHandler, pathParameters?: PathParameter): Promise<ApiResponseParsed<T>> => {
  return new Promise((resolve, reject) => {
    const evt: ApiEvent = <ApiEvent> {};

    if (pathParameters) {
      evt.pathParameters = pathParameters;
    }

    handler(evt, <ApiContext> {}, (error?: Error | null | string, result?: ApiResponse): void => {
      if (typeof result === 'undefined') {
        reject('No result was returned by the handler!');
        return;
      }

      const parsedResult: ApiResponseParsed<T> = result as ApiResponseParsed<T>;
      parsedResult.parsedBody = JSON.parse(result.body) as T;
      resolve(parsedResult);
    });
  });
};

export const callFailure: FailureCaller = <T> (handler: ApiHandler, pathParameters?: PathParameter): Promise<ApiErrorResponseParsed> => {
  return new Promise((resolve, reject) => {
    const evt: ApiEvent = <ApiEvent> {};

    if (pathParameters) {
      evt.pathParameters = pathParameters;
    }

    handler(evt, <ApiContext> {}, (error?: Error | null | string, result?: ApiResponse): void => {
      if (typeof result === 'undefined') {
        reject('No result was returned by the handler!');
        return;
      }

      const parsedResult: ApiErrorResponseParsed = result as ApiErrorResponseParsed;
      parsedResult.parsedBody = JSON.parse(result.body) as ErrorResponseBody;
      resolve(parsedResult);
    });
  });
};