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
 * @class UserValidator
 * @classdesc Provides validation middlewares for login and register route
 */
export default class UserValidator {
  /**
   * Email validator
   * @returns {function} call to a Check API middleware
   * @memberof UserValidator
   */
  static checkUserEmail(): ValidationChain {
    return CommonValidator.genericCheck('email')
      .trim()
      .isEmail()
      .withMessage('email is not valid')
      .customSanitizer((value) => makeLowerCase(value));
  }

  /**
   * Phone number validator
   * @param {string} field required field
   * @returns {function} call to a check API middleware
   * @memberof UserValidator
   */
  static checkPhoneNumber(field: string): ValidationChain {
    return CommonValidator.genericCheck(field)
      .trim()
      .isMobilePhone('en-NG')
      .withMessage('phone number is not valid');
  }

  /**
   * Firstname and lastname validator
   * @param {string} name
   * @returns {function} call to a Check API middleware
   * @memberof UserValidator
   */
  static checkName(name: string): ValidationChain {
    return CommonValidator.genericCheck(`${name}`)
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage(`${name} must be at least 2 characters, and maximum 20`)
      .not()
      .matches(/^[A-Za-z]+[-]{1}[A-Za-z]+([-]{1}[A-Za-z]+)+$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .not()
      .matches(/^[A-Za-z]+[']+[A-Za-z]+[']+[A-Za-z]+$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .matches(
        /^[A-Za-z]+(['-]?[A-Za-z]+)?([ -]?[A-Za-z]+)?(['-]?[A-Za-z]+)?$/,
        'g'
      )
      .withMessage(`invalid input for ${name}`)
      .customSanitizer((value) => makeLowerCase(value));
  }

  /**
   * Password validator
   * @param {string} field required field
   * @returns {function} call to a Check API middleware
   * @memberof UserValidator
   */
  static checkPassword(field = 'password'): ValidationChain {
    return CommonValidator.genericCheck(field)
      .isLength({ min: 6, max: 20 })
      .withMessage('password must be at least 6 characters')
      .not()
      .matches(/\s/, 'g')
      .withMessage('password cannot contain whitespace');
  }

  /**
   * Signup validation
   * @returns {array} an array of Check API middlewares
   * @memberof UserValidator
   */
  static registerUserValidation(): Array<ValidationFunction> {
    return [
      UserValidator.checkName('lastName'),
      UserValidator.checkName('firstName'),
      UserValidator.checkUserEmail(),
      UserValidator.checkPhoneNumber('phoneNumber'),
      checkForErrors,
      emptyBody
    ];
  }

  /**
   * Login validation
   * @returns {array} an array of Check API middlewares
   * @memberof UserValidator
   */
  static loginValidation(): Array<ValidationArray> {
    return [UserValidator.checkPassword(), emptyBody]; // checkForErrors, emptyBody];
  }
}
