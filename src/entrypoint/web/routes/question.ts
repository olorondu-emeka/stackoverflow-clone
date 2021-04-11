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

route.post(
  '/:questionId/answers',
  QuestionValidator.checkAnswerQuestion(),
  verifyUserToken,
  QuestionController.answerQuestion
);

route.post(
  '/:questionId/vote',
  QuestionValidator.checkVoteQuestion(),
  verifyUserToken,
  QuestionController.voteQuestion
);

route.get(
  '/:questionId',
  QuestionValidator.checkGetQuestion(),
  QuestionController.getQuestion
);

// subscriptions & notifications
route.post(
  '/:questionId/subscribe',
  QuestionValidator.checkSubscribeToQuestion(),
  verifyUserToken,
  QuestionController.subscribeToQuestion
);

route.get(
  '/:questionId/notifications',
  QuestionValidator.checkGetQuestionNotifications(),
  verifyUserToken,
  QuestionController.getQuestionNotifications
);

export default route;
