import { Sequelize } from 'sequelize';
import * as envConfig from '../config/config';

// const { development: Object } = envConfig
interface dbConfig {
	url?: string;
	username: string;
	password: string;
	database: string;
	hostname: string;
	dialect: string;
}

const env = process.env.NODE_ENV || 'development';
const config = envConfig[env];

const sequelize = config.url ? new Sequelize(config.url, config) : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };
