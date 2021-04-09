import request from 'supertest';
import app from '../../../src';
import { getNewUser } from '../../__mocks__/entities/user';
import {
  getNewQuestion,
  getBadQuestion
} from '../../__mocks__/entities/question';
import generateToken from '../../../src/entrypoint/web/helpers/generateToken';
import QuestionModel from '../../../src/data/database/models/Question';

import * as appPath from 'app-root-path';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${appPath}/.env` });

const newUser = getNewUser();
const newQuestion = getNewQuestion();
const badQuestion = getBadQuestion();
const testToken = generateToken({ id: 0 });
let registeredUserToken = '';

describe('Integration Test -- Question', () => {
  afterAll(async () => {
    await QuestionModel.destroy({
      where: {
        title: newQuestion.title
      }
    });
  });

  it('should throw an error for incomplete question details', async () => {
    const response = await request(app)
      .post('/api/v1/questions')
      .send(badQuestion);

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
  });

  it('should throw an unauthorized error for a user without a token', async () => {
    const response = await request(app)
      .post('/api/v1/questions')
      .send(newQuestion);

    expect(response.status).toEqual(401);
    expect(response.body.status).toEqual('error');
  });

  it('should throw an unauthorized error for a non-existent user', async () => {
    const response = await request(app)
      .post('/api/v1/questions')
      .set('Authorization', testToken)
      .send(newQuestion);

    expect(response.status).toEqual(404);
    expect(response.body.status).toEqual('error');
  });

  it('should successfully register new user', async () => {
    const response = await request(app).post('/api/v1/users').send(newUser);
    registeredUserToken = response.body.data.token;

    expect(response.status).toEqual(201);
    expect(response.body.status).toEqual('success');
  });

  it('should record a new user question successfully', async () => {
    const response = await request(app)
      .post('/api/v1/questions')
      .set('Authorization', registeredUserToken)
      .send(newQuestion);

    expect(response.status).toEqual(201);
    expect(response.body.status).toEqual('success');
  });
});
