import ErrorResponse from 'core/definitions/ErrorResponse';
import generateResponse from 'entrypoint/web/helpers/generateResponse';
import { Request, Response, NextFunction } from 'express';

/**
 * @name emptyBody
 * @param {Object} request express response object
 * @param {Object} response express response object
 * @param {Function} next next function to return
 * @returns {JSON} JSON response with status and response information
 */
const emptyBody = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const { body } = request;
  if (Object.keys(body).length === 0) {
    const errorResponse = ErrorResponse.badRequest('empty request body');
    const { statusCode, data } = errorResponse;
    return generateResponse(response, statusCode, data);
  } else {
    next();
  }
};

export default emptyBody;
