import express from 'express';
import { QuestionValidator } from 'entrypoint/web/middlewares';
import QuestionController from 'entrypoint/web/controllers/Question';

const route = express.Router();

route.post(
  '/',
  QuestionValidator.checkAskQuestion(),
  QuestionController.askQuestion
);

export default route;
