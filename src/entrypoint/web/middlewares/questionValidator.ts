/* eslint-disable no-unused-vars */

import checkForErrors from './checkForErrors';
import emptyBody from './emptyBody';
import CommonValidator from './commonValidators';
import { ValidationChain } from 'express-validator';
import { NextFunction, Response, Request } from 'express';

type ResponseOrVoid = Response | void;
type ValidationArray = ValidationChain | ValidationFunction;

interface ValidationFunction {
  (request: Request, response: Response, next: NextFunction): ResponseOrVoid;
}

/**
 * @name makeLowerCase
 * @param {String} value string to be sanitized
 * @returns {String} lower case string
 */
const makeLowerCase = (value: string): string => {
  if (value !== '') {
    return value.toLowerCase();
  }
  return value;
};

/**
 * @class QuestionValidator
 * @classdesc Provides validation middlewares for login and register route
 */
export default class QuestionValidator {
  /**
   * Question Validator
   * @param {string} field generic field
   * @returns {array} an array of Check API middlewares
   * @memberof QuestionValidator
   */
  static checkStringField(field: string): ValidationChain {
    return CommonValidator.genericCheck(field)
      .trim()
      .isLength({ min: 2 })
      .isString()
      .customSanitizer((value) => makeLowerCase(value));
  }

  /**
   * Question Validator
   * @param {string} field generic field
   * @returns {array} an array of Check API middlewares
   * @memberof QuestionValidator
   */
  static checkNumericField(field: string): ValidationChain {
    return CommonValidator.checkNumber(field);
  }

  /**
   * Question Validator: check ask question
   * @param {string} field generic field
   * @returns {array} an array of Check API middlewares
   * @memberof QuestionValidator
   */
  static checkAskQuestion(): Array<ValidationArray> {
    return [
      QuestionValidator.checkNumericField('userId'),
      QuestionValidator.checkStringField('title'),
      QuestionValidator.checkStringField('body'),
      checkForErrors,
      emptyBody
    ];
  }
}
