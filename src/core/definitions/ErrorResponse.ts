import {
  FinalResponse,
  ResponseObject,
  DataObject
} from 'core/definitions/CommonTypes';

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
  private static getResponseObject(
    message: string,
    data: DataObject | null = null
  ): ResponseObject {
    return {
      message,
      status: 'error',
      data
    };
  }

  /**
   *
   * @param {string} message expected message
   * @returns {Response} express response object
   */
  public static serverError(message: string): FinalResponse {
    const responseObject = this.getResponseObject(message);
    return {
      statusCode: 500,
      data: responseObject
    };
  }

  /**
   *
   * @param {string} message expected message
   * @returns {Response} express response object
   */
  public static unauthorized(message: string): FinalResponse {
    const responseObject = this.getResponseObject(message);
    return {
      statusCode: 401,
      data: responseObject
    };
  }

  /**
   *
   * @param {string} message expected message
   * @returns {Response} express response object
   */
  public static forbidden(message: string): FinalResponse {
    const responseObject = this.getResponseObject(message);
    return {
      statusCode: 403,
      data: responseObject
    };
  }

  /**
   *
   * @param {string} message expected message
   * @returns {Response} express response object
   */
  public static notFound(message: string): FinalResponse {
    const responseObject = this.getResponseObject(message);
    return {
      statusCode: 404,
      data: responseObject
    };
  }

  /**
   *
   * @param {string} message expected message
   * @param {DataObject} data expected data object
   * @returns {Response} express response object
   */
  public static badRequest(
    message: string,
    data: DataObject | null
  ): FinalResponse {
    const responseObject = this.getResponseObject(message, data);
    return {
      statusCode: 400,
      data: responseObject
    };
  }

  /**
   *
   * @param {string} message expected message
   * @returns {Response} express response object
   */
  public static conflict(message: string): FinalResponse {
    const responseObject = this.getResponseObject(message);
    return {
      statusCode: 409,
      data: responseObject
    };
  }
}
