import express from 'express';
import { UserValidator, verifyUserToken } from 'entrypoint/web/middlewares';
import UserController from 'entrypoint/web/controllers/User';

const route = express.Router();

route.post(
  '/create',
  UserValidator.loginValidation(),
  UserController.createSession
);

route.post('/destroy', verifyUserToken, UserController.destroySession);

export default route;
