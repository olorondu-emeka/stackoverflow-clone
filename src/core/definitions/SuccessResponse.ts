import {
  DataObject,
  FinalResponse,
  ResponseObject
} from 'core/definitions/CommonTypes';

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
   * @returns {FinalResponse} express response object
   */
  public static ok(message: string, data: DataObject): FinalResponse {
    const responseObject = this.getResponseObject(message, data);
    return {
      statusCode: 200,
      data: responseObject
    };
  }

  /**
   *
   * @param {string} message expected message
   * @param {DataObject} data expected data object
   * @returns {FinalResponse} express response object
   */
  public static created(message: string, data: DataObject): FinalResponse {
    const responseObject = this.getResponseObject(message, data);
    return {
      statusCode: 201,
      data: responseObject
    };
  }
}
