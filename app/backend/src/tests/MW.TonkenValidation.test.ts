import { expect } from 'chai';
import * as sinon from 'sinon';
import TokenValidation from '../middlewares/token.validation';
import jwtUtils from '../utils/jwt.utils';
import usersMock from './mocks/integration/users.mock';
import mapStatusHTTP from '../utils/mapStatusHTTP';

describe('TokenValidation Middleware', () => {
  let req: any;
  let res: any;
  let next: sinon.SinonSpy;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    next = sinon.spy();
  });

  it('Deve passar para o próximo middleware quando o token é válido', () => {
    req.headers.authorization = usersMock.token;
    sinon.stub(jwtUtils, 'verify').returns({ id: 1, username: 'username' });

    TokenValidation.tokenValidations(req, res, next);

    expect(next.calledOnce).to.be.true;

    if ((jwtUtils.verify as sinon.SinonStub).restore) {
      (jwtUtils.verify as sinon.SinonStub).restore();
    }
  });

  it('Deve retornar erro de token não encontrado quando o cabeçalho de autorização está ausente', () => {
    req.headers.authorization = undefined;

    TokenValidation.tokenValidations(req, res, next);

    expect(res.status.calledOnceWithExactly(401)).to.be.true;
    expect(res.json.calledOnceWithExactly({ message: 'Token not found' })).to.be.true;
    expect(next.called).to.be.false;
  });

  it('Deve retornar erro de token inválido quando o token não é válido', () => {
    req.headers.authorization = 'invalid token';
    sinon.stub(jwtUtils, 'verify').returns(undefined);

    TokenValidation.tokenValidations(req, res, next);

    expect(res.status.calledOnceWithExactly(401)).to.be.true;
    expect(res.json.calledOnceWithExactly({ message: 'Token must be a valid token' })).to.be.true;
    expect(next.called).to.be.false;

    if ((jwtUtils.verify as sinon.SinonStub).restore) {
      (jwtUtils.verify as sinon.SinonStub).restore();
    }
  });
});
