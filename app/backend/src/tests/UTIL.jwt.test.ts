import { expect } from 'chai';
import * as sinon from 'sinon';
import UserValidation from '../middlewares/user.validation';
import jwtUtils from '../utils/jwt.utils';
import usersMock from './mocks/integration/users.mock';

describe('Test UTIL JWT', () => {
  let payload: any;

  beforeEach(() => {
    payload = usersMock.jwtVerifyReturn;
  });
  
  it('Testa se o JWT retorna uma STRING com 140 caracteres', () => {
    const token = jwtUtils.sign(payload);

    expect(token).to.be.a('string');
    expect(token).to.have.lengthOf(140);
  });

  it('Testa se o JWT retorna um OBJETO com as propriedades "id", "email"', () => {
    const token = jwtUtils.sign(payload);
    const verify = jwtUtils.verify(token);

    expect(verify).to.be.a('object');
    expect(verify).to.be.deep.equal(payload);
  });

});
it('Testa se o JWT retorna UNDEFINED quando o token é inválido', () => {
  const veri = jwtUtils.verify('token');

  expect(veri).to.be.undefined;
});
