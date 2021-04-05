import { response, Response } from 'express';

interface ResponseObject {
  message: string;
  status: string;
  data: null;
}

/**
 * @class ErrorResponse
 */
export default class ErrorResponse {
  /**
   *
   * @param {string} message the incoming message
   * @param {object} data the required data
   * @returns {ResponseObject} the response object
   */
  private static getResponseObject(message: string): ResponseObject {
    return {
      message,
      status: 'error',
      data: null
    };
  }

  /**
   *
   * @param {string} message expected message
   * @returns {Response} express response object
   */
  public static serverError(message: string): Response {
    const responseObject = this.getResponseObject(message);
    return response.status(500).json(responseObject);
  }

  /**
   *
   * @param {string} message expected message
   * @returns {Response} express response object
   */
  public static unauthorized(message: string): Response {
    const responseObject = this.getResponseObject(message);
    return response.status(401).json(responseObject);
  }

  /**
   *
   * @param {string} message expected message
   * @returns {Response} express response object
   */
  public static forbidden(message: string): Response {
    const responseObject = this.getResponseObject(message);
    return response.status(403).json(responseObject);
  }

  /**
   *
   * @param {string} message expected message
   * @returns {Response} express response object
   */
  public static badRequest(message: string): Response {
    const responseObject = this.getResponseObject(message);
    return response.status(400).json(responseObject);
  }

  /**
   *
   * @param {string} message expected message
   * @returns {Response} express response object
   */
  public static conflict(message: string): Response {
    const responseObject = this.getResponseObject(message);
    return response.status(409).json(responseObject);
  }
}
