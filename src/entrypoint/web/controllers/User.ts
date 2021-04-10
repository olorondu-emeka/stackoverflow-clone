/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import ErrorResponse from 'core/definitions/ErrorResponse';
import generateResponse from 'entrypoint/web/helpers/generateResponse';
import passwordHelper from 'entrypoint/web/helpers/passwordHelper';
import {
  RegisterUserUC,
  CreateSessionUC,
  DestroySessionUC
} from 'config/UseCases';

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
      // UC stands for: use case
      const { lastName, firstName, email, password } = req.body;
      const hashedPassword = passwordHelper.hash(password);
      const response = await RegisterUserUC.execute({
        lastName,
        firstName,
        email,
        password: hashedPassword
      });

      const { statusCode, data } = response;

      if (data.data !== null) {
        let { user } = data.data;
        //@ts-ignore
        user = user.dataValues;
        //@ts-ignore
        delete user.id;
        //@ts-ignore
        delete user.password;

        data.data.user = user;
      }
      return generateResponse(res, statusCode, data);
    } catch (error) {
      const errorResponse = ErrorResponse.serverError(error.message);
      const { statusCode, data } = errorResponse;
      return generateResponse(res, statusCode, data);
    }
  }

  /**
   * @static
   * @param {Request} req express request object
   * @param {Response} res express response object
   * @returns {json} a json object
   */
  static async createSession(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const response = await CreateSessionUC.execute(email, password);

      const { statusCode, data } = response;
      return generateResponse(res, statusCode, data);
    } catch (error) {
      const errorResponse = ErrorResponse.serverError(error.message);
      const { statusCode, data } = errorResponse;
      return generateResponse(res, statusCode, data);
    }
  }

  /**
   * @static
   * @param {Request} req express request object
   * @param {Response} res express response object
   * @returns {json} a json object
   */
  static async destroySession(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers.authorization || '';
      const response = await DestroySessionUC.execute(token);
      const { statusCode, data } = response;

      return generateResponse(res, statusCode, data);
    } catch (error) {
      const errorResponse = ErrorResponse.serverError(error.message);
      const { statusCode, data } = errorResponse;
      return generateResponse(res, statusCode, data);
    }
  }
}
