import express from 'express';
import user from './user';
import question from './question';
import session from './session';

const route = express.Router();

route.use('/users', user);
route.use('/questions', question);
route.use('/sessions', session);

export default route;
