"use strict";
exports.__esModule = true;
exports.production = exports.test = exports.development = void 0;
var appPath = require("app-root-path");
var dotenv = require("dotenv");
dotenv.config({ path: appPath + "/.env" });
var mainDialect = 'mysql';
var development = {
    username: process.env.DEV_USERNAME || '',
    password: process.env.DEV_PASSWORD || '',
    database: process.env.DEV_DATABASE || '',
    host: process.env.DEV_HOST || '',
    dialect: mainDialect
};
exports.development = development;
var test = {
    username: process.env.TEST_USERNAME || '',
    password: process.env.TEST_PASSWORD || '',
    database: process.env.TEST_DATABASE || '',
    host: process.env.TEST_HOST || '',
    dialect: mainDialect
};
exports.test = test;
var production = {
    username: process.env.PROD_USERNAME || '',
    password: process.env.PROD_PASSWORD || '',
    database: process.env.PROD_DATABASE || '',
    host: process.env.PROD_HOST || '',
    dialect: mainDialect
};
exports.production = production;
