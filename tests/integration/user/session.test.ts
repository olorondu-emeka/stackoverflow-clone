import request from 'supertest';
import app from '../../../src';
import { getBadUser, getNewUser } from '../../__mocks__/entities/user';
import UserModel from '../../../src/data/database/models/User';

const newUser = getNewUser();
const badUser = getBadUser();
let registeredUserToken = '';

describe('Integration Test -- Session', () => {
  afterAll(async () => {
    await UserModel.destroy({
      where: {
        email: newUser.email
      }
    });
  });

  it('should successfully register new user', async () => {
    const response = await request(app).post('/api/v1/users').send(newUser);
    registeredUserToken = response.body.data.token;

    expect(response.status).toEqual(201);
    expect(response.body.status).toEqual('success');
  });

  it('should throw an error for incomplete user details', async () => {
    const response = await request(app).post('/api/v1/users').send(badUser);

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
  });

  it('should successfully login user', async () => {
    const response = await request(app)
      .post('/api/v1/sessions/create')
      .send({ email: newUser.email, password: newUser.password });

    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('success');
  });

  it('should return existing session details for a logged in user', async () => {
    const response = await request(app)
      .post('/api/v1/sessions/create')
      .send({ email: newUser.email, password: newUser.password });

    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('success');
  });

  it('should successfully logout session', async () => {
    const response = await request(app)
      .post('/api/v1/sessions/destroy')
      .set('Authorization', registeredUserToken);

    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('success');
  });

  it('should throw an error for incomplete session details', async () => {
    const response = await request(app)
      .post('/api/v1/sessions/create')
      .send({ email: newUser.email });

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
  });

  it('should throw an error for a non-existnt route', async () => {
    const response = await request(app)
      .post('/sessions/create')
      .send({ email: newUser.email });

    expect(response.status).toEqual(404);
  });
});
