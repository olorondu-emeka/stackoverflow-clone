import request from 'supertest';
import app from '../../src';
import { getBadUser, getNewUser } from '../__mocks__/entities/user';

const newUser = getNewUser();
const badUser = getBadUser();

describe('Integration Test -- User', () => {
  it('should successfully register new user', async () => {
    const response = await request(app).post('/api/v1/users').send(newUser);

    expect(response.status).toEqual(201);
    expect(response.body.status).toEqual('success');
    // done();
  });

  it('should throw an error for incomplete user details', async () => {
    const response = await request(app).post('/api/v1/users').send(badUser);

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
    // done();
  });
});
