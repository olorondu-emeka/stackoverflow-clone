import { Sequelize } from 'sequelize';
import * as dbConfig from '../config/config';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

const sequelize = config.url ? new Sequelize(config.url, config) : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };
