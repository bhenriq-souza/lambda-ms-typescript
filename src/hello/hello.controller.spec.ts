import { expect } from 'chai';
import { Chance } from 'chance';
import { instance, mock, reset, when } from 'ts-mockito';

import { HttpStatusCode } from '../shared/http/status-codes';

import { ErrorCode } from '../shared/errors/codes';
import { ErrorMessage } from '../shared/errors/messages';
import { BadRequestResult } from '../shared/errors/types';

import { HelloController } from './hello.controller';
import { HelloMessageResult, HelloTestData } from './hello.interfaces';
import { HelloService } from './hello.service';

import { callFailure, callSuccess } from '../../test';
import { ApiErrorResponseParsed, ApiResponseParsed, PathParameter  } from '../../test/test.interfaces';

const chance: Chance.Chance = new Chance();

describe('HelloController', () => {
  const helloServiceMock: HelloService = mock(HelloService);

  let helloController: HelloController;
  let testData: HelloTestData;

  beforeEach(() => {
    reset(helloServiceMock);

    const helloServiceMockInstance: HelloService = instance(helloServiceMock);
    helloController = new HelloController(helloServiceMockInstance);

    const nameMock: string = chance.name();
    const txtMock: string = `Say hello to ${nameMock}`;

    testData = {
      error: {
        code: chance.word(),
        description: chance.sentence(),
      },
      message: {
        name: nameMock,
        text: txtMock
      },
    };
  });

  describe('sayHello function', () => {
    describe('success', () => {
      it('should return HTTP 200 OK', async () => {
        when(helloServiceMock.sayHallo(testData.message.name))
          .thenReturn(Promise.resolve<HelloMessageResult>(testData));

        const pathParams: PathParameter = {
          name: testData.message.name
        };

        const response: ApiResponseParsed<HelloMessageResult> = await callSuccess(helloController.sayHello, pathParams);
        expect(response.statusCode).to.equal(HttpStatusCode.Ok);
      });

      it('should return message properties from the service', async () => {
        when(helloServiceMock.sayHallo(testData.message.name))
            .thenReturn(Promise.resolve<HelloMessageResult>(testData));

        const pathParams: PathParameter = {
          name: testData.message.name
        };

        const response: ApiResponseParsed<HelloMessageResult> = await callSuccess(helloController.sayHello, pathParams);

        expect(response.parsedBody.message.name).to.equal(testData.message.name);
        expect(response.parsedBody.message.text).to.equal(testData.message.text);
      });
    });

    describe('failure', () => {
      it('should return Bad Request when missing path parameter', async () => {

        const errorResult: BadRequestResult = new BadRequestResult(testData.error.code, testData.error.description);

        when(helloServiceMock.sayHallo(testData.message.name))
          .thenReturn(Promise.reject(errorResult));

        const pathParams: PathParameter = {
          name: '',
        };

        const response: ApiErrorResponseParsed = await callFailure(helloController.sayHello, pathParams);

        expect(response.statusCode).to.equal(HttpStatusCode.BadRequest);
        expect(response.parsedBody.error.code).to.equal(ErrorCode.MissingName);
        expect(response.parsedBody.error.description).to.equal(ErrorMessage[ErrorCode.MissingName]);
      });
    });
  });
});
