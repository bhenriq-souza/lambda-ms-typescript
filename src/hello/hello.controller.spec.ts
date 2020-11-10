import { Chance } from 'chance';
import { expect } from 'chai';
import { instance, mock, reset, when } from 'ts-mockito';

import { HttpStatusCode } from '../shared/http-status-codes';

import { HelloService } from './hello.service';
import { HelloTestData, HelloMessage, HelloMessageResult } from './hello.interfaces';
import { HelloController } from './hello.controller';

import { PathParameter, ApiResponseParsed } from '../../test/test.interfaces';
import { callSuccess } from '../../test';

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
    });
  });
});