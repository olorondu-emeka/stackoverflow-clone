import request from 'supertest';
import app from '../../src';
import { getBadUser, getNewUser } from '../__mocks__/entities/user';
import UserModel from '../../src/data/database/models/User';

const newUser = getNewUser();
const badUser = getBadUser();

describe('Integration Test -- User', () => {
  afterAll(async () => {
    await UserModel.destroy({
      where: {
        email: newUser.email
      }
    });
  });

  it('should successfully register new user', async () => {
    const response = await request(app).post('/api/v1/users').send(newUser);

    expect(response.status).toEqual(201);
    expect(response.body.status).toEqual('success');
  });

  it('should throw an error for incomplete user details', async () => {
    const response = await request(app).post('/api/v1/users').send(badUser);

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
  });
});
