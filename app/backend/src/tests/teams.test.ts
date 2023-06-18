import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/SequelizeTeams';
import TeamsMock from './mocks/integration/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe.only('Teste "Integração" rota /teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(TeamsModel, "findAll")
  //     .resolves({...TeamsMock.allTeams});
  // });

  // afterEach(()=>{
  //   (TeamsModel.findAll as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Testa o findAll', async () => {
    const response = {...TeamsMock.allTeams}
    
    sinon
    .stub(TeamsModel, "findAll")
    .resolves(response);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.eq(200);
    expect(body).to.be.keys(response);// ele está testando a chave antes do value no caso "0, 1, 2"
    // expect(body).to.be.an('array');
    // expect(body).to.be.an('object');
  });
});
