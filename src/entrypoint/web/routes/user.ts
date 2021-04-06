import express from 'express';
import UserController from 'entrypoint/web/controllers/User';

const route = express.Router();

route.post('/', UserController.registerUser);

export default route;
