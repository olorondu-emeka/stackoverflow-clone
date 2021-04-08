import { validationResult, ValidationError } from 'express-validator';
import ErrorResponse from 'core/definitions/ErrorResponse';
import generateResponse from 'entrypoint/web/helpers/generateResponse';
import { Request, Response, NextFunction } from 'express';

type Location = 'body' | 'cookies' | 'headers' | 'params' | 'query' | '';
interface IGenericObject {
  [index: string]: string | undefined | any;
}

/**
 * @name checkForErrors
 * @param {Object} request express response object
 * @param {Object} response express response object
 * @param {Function} next next function to return
 * @returns {JSON} JSON response with status and response information
 */
export default (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const error: IGenericObject = {};
  /**
   * @name errorFormatter
   * @param {ValidationError} inputDetails request express response object
   * @returns {JSON} JSON response with status and response information
   */
  const errorFormatter = (inputDetails: ValidationError): IGenericObject => {
    const location: Location = inputDetails.location || '';
    const { msg, param } = inputDetails;

    if (!Object.keys(error).includes(location)) {
      error[`${location}`] = {};
    }
    error[`${location}`][`${param}`] = msg;
    return error;
  };
  const validationResults = validationResult(request).array({
    onlyFirstError: true
  });
  validationResults.forEach(
    (resultObject: ValidationError): IGenericObject =>
      errorFormatter(resultObject)
  );
  if (Object.keys(error).length > 0) {
    const { statusCode, data } = ErrorResponse.badRequest('bad request', {
      ...error
    });
    return generateResponse(response, statusCode, data);
  } else {
    next();
  }
};
