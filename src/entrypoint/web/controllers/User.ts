import { Request, Response } from 'express';
import ErrorResponse from 'core/definitions/ErrorResponse';
import generateResponse from 'entrypoint/web/helpers/generateResponse';
import { RegisterUserUC } from 'config/UseCases';

/**
 * @class UserController
 */
export default class UserController {
  /**
   * @static
   * @param {Request} req express request object
   * @param {Response} res express response object
   * @returns {json} a json object
   */
  static async registerUser(req: Request, res: Response): Promise<Response> {
    try {
      const { lastName, firstName, email, password } = req.body;
      const response = await RegisterUserUC.execute({
        lastName,
        firstName,
        email,
        password
      });

      const { statusCode, data } = response;
      return generateResponse(res, statusCode, data);
    } catch (error) {
      const errorResponse = ErrorResponse.serverError(error.message);
      const { statusCode, data } = errorResponse;
      return generateResponse(res, statusCode, data);
    }
  }
}
