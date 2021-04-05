import { response, Response } from 'express';

interface DataObject {
  [index: string]: string | number | boolean;
}

interface ResponseObject {
  message: string;
  status: string;
  data: DataObject | null;
}

/**
 * @class SuccessResponse
 */
export default class SuccessResponse {
  /**
   *
   * @param {string} message the incoming message
   * @param {object} data the required data
   * @returns {ResponseObject} the response object
   */
  private static getResponseObject(
    message: string,
    data: DataObject = {}
  ): ResponseObject {
    return {
      message,
      status: 'success',
      data
    };
  }

  /**
   *
   * @param {string} message expected message
   * @param {DataObject} data expected data object
   * @returns {Response} express response object
   */
  public static ok(message: string, data: DataObject): Response {
    const responseObject = this.getResponseObject(message, data);
    return response.status(200).json(responseObject);
  }

  /**
   *
   * @param {string} message expected message
   * @param {DataObject} data expected data object
   * @returns {Response} express response object
   */
  public static created(message: string, data: DataObject): Response {
    const responseObject = this.getResponseObject(message, data);
    return response.status(201).json(responseObject);
  }
}
