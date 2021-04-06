import { Response } from 'express';
import { ResponseObject } from 'core/definitions/CommonTypes';

/**
 *
 * @param {Response} res express response object
 * @param {integer} statusCode  status code
 * @param {DataObject} data data object to be returned as output
 * @returns {json} json response
 */
const generateResponse = (
  res: Response,
  statusCode: number,
  data: ResponseObject
): Response => {
  return res.status(statusCode).json(data);
};

export default generateResponse;
