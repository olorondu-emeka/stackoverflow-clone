import express from 'express';
import user from './user';
import question from './question';

const route = express.Router();

route.use('/users', user);
route.use('/questions', question);

export default route;
