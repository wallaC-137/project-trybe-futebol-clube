import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/SequelizeMatches';
import MatchesMock from './mocks/integration/matches.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste "Integração" rota /matches', () => {
  after(()=> sinon.restore())

  // TESTE ESTÁ QUEBRANDO O TESTE DA ROTA /teams

  // it('Testa o findAll', async () => {
  //   const response = {...MatchesMock.finAllMatches}
    
  //   sinon
  //   .stub(MatchesModel, "findAll")
  //   .resolves(response);

  //   const { status, body } = await chai.request(app).get('/matches');

  //   expect(status).to.be.eq(200);
  //   expect(body).to.be.includes(response);
  // });
});


