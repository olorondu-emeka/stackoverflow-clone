import appPath from 'app-root-path';
import dotenv from 'dotenv';

// const appPath = require('app-root-path');
// const dotenv = require('dotenv');

dotenv.config({ path: `${appPath}/.env` });

type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';

export interface IDbDetails {
  url?: string;
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  dialect?: Dialect;
}

export interface IDbObject {
  [index: string]: IDbDetails;
}

const mainDialect: Dialect = 'mysql';

const development = {
  username: process.env.DEV_USERNAME || '',
  password: process.env.DEV_PASSWORD || '',
  database: process.env.DEV_DATABASE || '',
  host: process.env.DEV_HOST || '',
  dialect: mainDialect
};

const test = {
  username: process.env.TEST_USERNAME || '',
  password: process.env.TEST_PASSWORD || '',
  database: process.env.TEST_DATABASE || '',
  host: process.env.TEST_HOST || '',
  dialect: mainDialect
};

const production = {
  username: process.env.PROD_USERNAME || '',
  password: process.env.PROD_PASSWORD || '',
  database: process.env.PROD_DATABASE || '',
  host: process.env.PROD_HOST || '',
  dialect: mainDialect
};

export { development, test, production };
