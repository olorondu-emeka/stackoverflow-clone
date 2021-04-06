// import appPath from 'app-root-path';
// import dotenv from 'dotenv';

const appPath = require('app-root-path');
const dotenv = require('dotenv');

dotenv.config({ path: `${appPath}/.env` });

const development = {
  username: process.env.DEV_USERNAME,
  password: process.env.DEV_PASSWORD,
  database: process.env.DEV_DATABASE,
  host: process.env.DEV_HOST,
  dialect: 'mysql'
};

const test = {
  username: process.env.TEST_USERNAME,
  password: process.env.TEST_PASSWORD,
  database: process.env.TEST_DATABASE,
  host: process.env.TEST_HOST,
  dialect: 'mysql'
};

const production = {
  username: process.env.PROD_USERNAME,
  password: process.env.PROD_PASSWORD,
  database: process.env.PROD_DATABASE,
  host: process.env.PROD_HOST,
  dialect: 'mysql'
};

module.exports = { development, test, production };
