import { expect } from 'chai';
import * as sinon from 'sinon';
import UserValidation from '../middlewares/user.validation';
import jwtUtils from '../utils/jwt.utils';
import usersMock from './mocks/integration/users.mock';

describe('UserValidation Middleware', () => {
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

  it('Testa o middleware LoginValidation quando HÁ EMAIL e PASSWORD', () => {
    req.body = usersMock.loginValid;

    UserValidation.validateLogin(req, res, next);

    expect(next.calledOnce).to.be.true;

    if ((jwtUtils.verify as sinon.SinonStub).restore) {
      (jwtUtils.verify as sinon.SinonStub).restore();
    }
  });

  it('Testa o middleware LoginValidation quando NÃO HÁ EMAIL ou PASSWORD', () => {
    req.body = { email: usersMock.emailValid };

    UserValidation.validateLogin(req, res, next);

    expect(next.calledOnce).to.be.false;
    expect(res.json.calledOnceWithExactly({ message: 'All fields must be filled' })).to.be.true;

    if ((jwtUtils.verify as sinon.SinonStub).restore) {
      (jwtUtils.verify as sinon.SinonStub).restore();
    }
  });
});
