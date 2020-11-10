import { Chance } from 'chance';
import { expect } from 'chai';
import { instance, mock, reset, when } from 'ts-mockito';

import { HttpStatusCode } from '../shared/http/status-codes';

import { ErrorCode } from '../shared/errors/codes';
import { ErrorMessage } from '../shared/errors/messages';
import { BadRequestResult } from '../shared/errors/types';

import { HelloService } from './hello.service';
import { HelloTestData, HelloMessage, HelloMessageResult } from './hello.interfaces';
import { HelloController } from './hello.controller';

import { PathParameter, ApiResponseParsed, ApiErrorResponseParsed } from '../../test/test.interfaces';
import { callSuccess, callFailure } from '../../test';

const chance: Chance.Chance = new Chance();

describe('HelloController', () => {
  const helloServiceMock: HelloService = mock(HelloService);

  let helloController: HelloController;
  let testData: HelloTestData;

  beforeEach(() => {
    reset(helloServiceMock);

    const helloServiceMockInstance: HelloService = instance(helloServiceMock);
    helloController = new HelloController(helloServiceMockInstance);


    const nameMock = chance.name();
    const txtMock = `Say hello to ${nameMock}`;

    const helloMsgMock: HelloMessage = {
      name: nameMock,
      text: txtMock
    };

    const errMock = {
      code: chance.word(),
      description: chance.sentence(),
    };

    testData = {
      message: helloMsgMock,
      error: errMock
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