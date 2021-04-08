import express from 'express';
import { UserValidator } from 'entrypoint/web/middlewares';
import UserController from 'entrypoint/web/controllers/User';

const route = express.Router();

route.post(
  '/',
  UserValidator.registerUserValidation(),
  UserController.registerUser
);

export default route;
