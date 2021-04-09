import express from 'express';
import { QuestionValidator, verifyUserToken } from 'entrypoint/web/middlewares';
import QuestionController from 'entrypoint/web/controllers/Question';

const route = express.Router();

route.post(
  '/',
  QuestionValidator.checkAskQuestion(),
  verifyUserToken,
  QuestionController.askQuestion
);

export default route;
