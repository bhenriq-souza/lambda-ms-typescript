import { ApiResponse, ErrorResponseBody } from '../src/shared/interfaces/api';

export interface ApiResponseParsed<T> extends ApiResponse {
  parsedBody: T;
}

export interface ApiErrorResponseParsed extends ApiResponse {
  parsedBody: ErrorResponseBody;
}

export interface PathParameter {
  [name: string]: string;
}