import { expect } from 'chai';
import { Chance } from 'chance';

import { HelloService } from './hello.service';
import { HelloMessage, HelloMessageResult } from './hello.interfaces';

const chance: Chance.Chance = new Chance();

describe('HelloService', () => {
  let service: HelloService;
  let hello: HelloMessage;

  beforeEach('', () => {

    service = new HelloService();

    const nameMock = chance.name();
    const txtMock = `Say hello to ${nameMock}`;

    hello = {
      name: nameMock,
      text: txtMock,
    };
  });

  describe('sayHello function', () => {
    it('should resolve with input data', async () => {
      const result: HelloMessageResult = await service.sayHallo(hello.name);
      expect(result.message.name).to.equal(hello.name);
      expect(result.message.text).to.equal(hello.text);
    });
  });
});