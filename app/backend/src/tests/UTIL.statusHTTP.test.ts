import { expect } from 'chai';
import mapStatusHTTP from '../utils/mapStatusHTTP';

describe('Test UTIL MapStatusHTTP', () => {
  it('Testa o CODE retornado pelo MapStatusHTTP', () => {
    const status = ['INVALID_DATA', 'UNAUTHORIZED', 'INTERNAL_ERROR', 'NOT_FOUND', 'UNPROCESSABLE_ENTITY'];
    const statusExpected = [400, 401, 500, 404, 422];
    
    status.forEach((element, index) => {
      expect(mapStatusHTTP(element)).to.be.equal(statusExpected[index]);
    });
  });
});
