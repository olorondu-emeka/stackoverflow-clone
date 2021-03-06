import request from 'supertest';
import app from '../../../src';
import { getNewUser } from '../../__mocks__/entities/user';
import {
  getNewQuestion,
  getBadQuestion,
  getNewAnswer,
  getBadAnswer
} from '../../__mocks__/entities/question';
import generateToken from '../../../src/entrypoint/web/helpers/generateToken';
import QuestionModel from '../../../src/data/database/models/Question';

import * as appPath from 'app-root-path';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${appPath}/.env` });

const newUser = getNewUser();
const newUser2 = getNewUser();

const newQuestion = getNewQuestion();
const badQuestion = getBadQuestion();

const newAnswer = getNewAnswer();
const badAnswer = getBadAnswer();
const testToken = generateToken({ id: 0 });

let registeredUserToken = '';
let registeredUserToken2 = '';
let questionId: number;

describe('Integration Test -- Ask Question', () => {
  it('should throw an error for incomplete question details', async () => {
    const response = await request(app)
      .post('/api/v1/questions')
      .send(badQuestion);

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
  });

  it('should successfully register new user', async () => {
    const response = await request(app).post('/api/v1/users').send(newUser);
    registeredUserToken = response.body.data.token;

    expect(response.status).toEqual(201);
    expect(response.body.status).toEqual('success');
  });

  it('should successfully register a second new user', async () => {
    const response = await request(app).post('/api/v1/users').send(newUser2);
    registeredUserToken2 = response.body.data.token;

    expect(response.status).toEqual(201);
    expect(response.body.status).toEqual('success');
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

  it('should record a new user question successfully', async () => {
    const response = await request(app)
      .post('/api/v1/questions')
      .set('Authorization', registeredUserToken)
      .send(newQuestion);
    questionId = response.body.data.question.id;

    expect(response.status).toEqual(201);
    expect(response.body.status).toEqual('success');
  });
});

describe('Integration Test -- Answer Question', () => {
  it('should throw a 400 error for an incomplete answer body', async () => {
    const response = await request(app)
      .post(`/api/v1/questions/${1500}/answers`)
      .set('Authorization', registeredUserToken)
      .send(badAnswer);

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
  });

  it('should throw a 404 error for a non-existent question', async () => {
    const response = await request(app)
      .post(`/api/v1/questions/${1500}/answers`)
      .set('Authorization', registeredUserToken)
      .send(newAnswer);

    expect(response.status).toEqual(404);
    expect(response.body.status).toEqual('error');
  });

  it('should answer an existing question successfully', async () => {
    const response = await request(app)
      .post(`/api/v1/questions/${questionId}/answers`)
      .set('Authorization', registeredUserToken)
      .send(newAnswer);

    expect(response.status).toEqual(201);
    expect(response.body.status).toEqual('success');
  });

  it('should throw a 409 error for an already existing answer', async () => {
    const response = await request(app)
      .post(`/api/v1/questions/${questionId}/answers`)
      .set('Authorization', registeredUserToken)
      .send(newAnswer);

    expect(response.status).toEqual(409);
    expect(response.body.status).toEqual('error');
  });
});

describe('Integration Test -- Vote Question', () => {
  it('should throw a 400 error for incomplete details', async () => {
    const response = await request(app)
      .post(`/api/v1/questions/${questionId}/vote`)
      .set('Authorization', registeredUserToken)
      .send(newAnswer);

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
  });

  it('should throw a 404 error for a non-existent question', async () => {
    const response = await request(app)
      .post(`/api/v1/questions/${1500}/vote?voteOption=upvote`)
      .set('Authorization', registeredUserToken)
      .send(newAnswer);

    expect(response.status).toEqual(404);
    expect(response.body.status).toEqual('error');
  });

  it('should successfully upvote a question', async () => {
    const response = await request(app)
      .post(`/api/v1/questions/${questionId}/vote?voteOption=upvote`)
      .set('Authorization', registeredUserToken)
      .send(newAnswer);

    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('success');
  });

  it('should successfully downvote a question', async () => {
    const response = await request(app)
      .post(`/api/v1/questions/${questionId}/vote?voteOption=downvote`)
      .set('Authorization', registeredUserToken)
      .send(newAnswer);

    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('success');
  });
});

describe('Integration Test -- SubscribeToQuestion', () => {
  it('should throw an error for incomplete subscription details', async () => {
    const response = await request(app)
      .post(`/api/v1/questions/hello/subscribe`)
      .set('Authorization', registeredUserToken2);

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
  });

  it('should successfully subscribe to a question', async () => {
    const response = await request(app)
      .post(`/api/v1/questions/${questionId}/subscribe`)
      .set('Authorization', registeredUserToken2);

    expect(response.status).toEqual(201);
    expect(response.body.status).toEqual('success');
  });

  it('should throw an error for a question that a user has already subscribed to', async () => {
    const response = await request(app)
      .post(`/api/v1/questions/${questionId}/subscribe`)
      .set('Authorization', registeredUserToken);

    expect(response.status).toEqual(409);
    expect(response.body.status).toEqual('error');
  });
});

describe('Integration Test -- GetQuestionNotifications', () => {
  it('should throw an error for incomplete notification details', async () => {
    const response = await request(app)
      .get(`/api/v1/questions/hello/notifications`)
      .set('Authorization', registeredUserToken2);

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
  });

  it('should succesfully retrieve notifcations for a subscribed question', async () => {
    const response = await request(app)
      .get(`/api/v1/questions/${questionId}/notifications`)
      .set('Authorization', registeredUserToken2);

    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('success');
  });
});

describe('Integration -- GetQuestion', () => {
  afterAll(async () => {
    await QuestionModel.destroy({
      where: {
        title: newQuestion.title
      }
    });
  });

  it('should throw an error for incomplete notification details', async () => {
    const response = await request(app).get(`/api/v1/questions/hello`);

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
  });

  it('should successfully retrieve question and its answers', async () => {
    const response = await request(app).get(`/api/v1/questions/${questionId}`);

    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('success');
  });
});
