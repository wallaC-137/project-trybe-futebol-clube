// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../../app';
// import TeamsModel from '../../database/models/SequelizeTeams';
// import TeamsMock from '../mocks/integration/teams.mock';

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Seu teste', () => {
//   /**
//    * Exemplo do uso de stubs com tipos
//    */

//   let chaiHttpResponse: Response;

//   // before(async () => {
//   //   sinon
//   //     .stub(TeamsModel, "findAll")
//   //     .resolves({...TeamsMock.allTeams});
//   // });

//   after(()=>sinon.restore())

//   // it('...', async () => {
//   //   chaiHttpResponse = await chai
//   //      .request(app)
//   //      ...

//   //   expect(...)
//   // });

//   it.only('Seu sub-teste', async () => {
//     const response = {...TeamsMock.allTeams}
    
//     sinon
//     .stub(TeamsModel, "findAll")
//     .resolves(response);

//     const { status, body } = await chai.request(app).get('/teams');

//     expect(status).to.be.eq(200);
//     expect(body).to.be.deep.eq(response);
//   });
// });
