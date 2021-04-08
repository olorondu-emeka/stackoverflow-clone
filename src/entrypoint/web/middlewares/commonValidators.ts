import { check, query, ValidationChain } from 'express-validator';

/**
 * @class CommonValidator
 * @classdesc Provides validation middlewares for login and signup route
 */
export default class CommonValidator {
  /**
   * Generic validator to be used by all others
   * @param {string} field
   * @returns {function} call to a Check API middleware
   * @memberof Validation
   */
  static genericCheck(field: string): ValidationChain {
    return check(`${field}`)
      .exists()
      .withMessage(`${field} is missing`)
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage(`${field} cannot be blank`);
  }

  /**
   * Generic validator to be used by all others
   * @param {string} field
   * @returns {function} call to a Check API middleware
   * @memberof Validation
   */
  static queryCheck(field: string): ValidationChain {
    return query(`${field}`)
      .exists()
      .withMessage(`${field} is missing`)
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage(`${field} cannot be blank`);
  }

  /**
   * input validator to be used by all others
   * @param {string} field
   * @returns {function} call to a Check API middleware
   * @memberof Validation
   */
  static inputCheck(field: string): ValidationChain {
    return check(`${field}`)
      .optional()
      .trim()
      .not()
      .isEmpty({ ignore_whitespace: true });
  }

  /**
   * Generic Number validator
   * @param {string} item
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static checkNumber(item: string): ValidationChain {
    return CommonValidator.genericCheck(item)
      .trim()
      .isInt({ min: 1 })
      .withMessage(`${item} value must be at least 1 and an integer`);
  }

  /**
   * Optional Number validator
   * @param {string} item
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static checkNumberOptional(item: string): ValidationChain {
    return CommonValidator.inputCheck(item)
      .trim()
      .isInt({ min: 1 })
      .withMessage(`${item} value must be at least 1 and an integer`);
  }

  /**
   * Generic Boolean validator
   * @param {string} item
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static checkBoolean(item: string): ValidationChain {
    // eslint-disable-next-line max-len
    return CommonValidator.genericCheck(item)
      .trim()
      .isBoolean()
      .withMessage(`${item} value must be true or false`);
  }

  /**
   * Optional Boolean validator
   * @param {string} item
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static checkBooleanOptional(item: string): ValidationChain {
    // eslint-disable-next-line max-len
    return CommonValidator.inputCheck(item)
      .trim()
      .isBoolean()
      .withMessage(`${item} value must be true or false`);
  }
}
