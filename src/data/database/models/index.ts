import { Sequelize } from 'sequelize';
import { development, test, production, IDbDetails } from '../config/config';

const env = process.env.NODE_ENV || 'development';
let config: IDbDetails = development;

switch (env) {
case 'development':
  config = development;
  break;
case 'test':
  config = test;
  break;
case 'production':
  config = production;
  break;
default:
  config = development;
  break;
}

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config);

export { Sequelize, sequelize };
