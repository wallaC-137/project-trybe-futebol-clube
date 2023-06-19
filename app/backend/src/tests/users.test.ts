import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModel from '../database/models/SequelizeUsers';
import UsersMock from './mocks/integration/users.mock';

import { Response } from 'superagent';
import jwtUtils from '../utils/jwt.utils';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste "Integração" rota (users) /login', () => {
  after(()=> sinon.restore())

  const model = {
    findOne: sinon.stub(UsersModel, "findOne"),
  };
  // const verify = {
  //   verify: sinon.stub(jwtUtils, "verify"),
  // }
  // sinon.stub(jwtUtils, "verify").returns(UsersMock.jwtVerifyReturn);


  it('Testa o LOGIN com DADOS VÁLIDOS', async () => {
    const request = {...UsersMock.loginValid};
    const response = {...UsersMock.userValidResponse};
    const token = UsersMock.token;
    const build = UsersModel.build(response);

    model.findOne.onFirstCall().resolves(build);

    const { status, body } = await chai.request(app).post('/login').send(request).set(token);


    // falta testar o caso do email ou senha setem invalidos


    expect(status).to.be.eq(200);
    expect(body).to.be.key('token');
  });
  
  it('Testa o LOGIN com DADOS INVÁLIDOS', async () => {
    const request = {...UsersMock.loginInvalid};
    const response = {...UsersMock.userInvalidResponse};
    const token = UsersMock.token;
    // const build = UsersModel.build(response);

    // model.findOne.onFirstCall().resolves(build);

    const { status, body } = await chai.request(app).post('/login').send(request).set(token);


    // falta testar o caso do email ou senha setem invalidos


    expect(status).to.be.eq(401);
    expect(body).to.be.deep.equal(response);
  });

  it('Testa o getRole (/role)', async () => {
    const response = {...UsersMock.userValidResponse};
    const build = UsersModel.build(response);

    model.findOne.onSecondCall().resolves(build);
    sinon.stub(jwtUtils, "verify").returns(UsersMock.jwtVerifyReturn);

    const { status, body } = await chai.request(app).get('/login/role').set('authorization', 'valid token');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(UsersMock.roleValid);
  });
});

describe('Teste "Integração" rota (users) /login', () => {

  it('Testa o getRole (/role) USER NOT FOUND', async () => {
    const response = {...UsersMock.userValidResponse};
    // const build = UsersModel.build(response);

    // sinon.stub(UsersModel, "findOne").resolves(null);


    sinon.stub(UsersModel, 'findOne').resolves(null);
    sinon.stub(jwtUtils, "verify").returns(UsersMock.jwtVerifyReturn);

    const { status, body } = await chai.request(app).get('/login/role').set('authorization', 'valid token');

    expect(status).to.be.eq(404);
    expect(body).to.be.deep.equal({ message: 'User not found' });
  });
});