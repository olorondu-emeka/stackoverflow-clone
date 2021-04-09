import * as appPath from 'app-root-path';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${appPath}/.env` });

type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';

export interface IDbDetails {
  url?: string;
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  dialect?: Dialect;
  logging?: boolean;
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
  logging: false,
  dialect: mainDialect
};

const test = {
  username: process.env.TEST_USERNAME || '',
  password: process.env.TEST_PASSWORD || '',
  database: process.env.TEST_DATABASE || '',
  host: process.env.TEST_HOST || '',
  logging: false,
  dialect: mainDialect
};

const production = {
  username: process.env.PROD_USERNAME || '',
  password: process.env.PROD_PASSWORD || '',
  database: process.env.PROD_DATABASE || '',
  host: process.env.PROD_HOST || '',
  logging: false,
  dialect: mainDialect
};

export { development, test, production };
