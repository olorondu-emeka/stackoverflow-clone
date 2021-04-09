import { Request, Response } from 'express';
import ErrorResponse from 'core/definitions/ErrorResponse';
import generateSlug from 'entrypoint/web/helpers/generateSlug';
import generateResponse from 'entrypoint/web/helpers/generateResponse';
import { AskQuestionUC } from 'config/UseCases';

/**
 * @class  QuestionController
 */
export default class QuestionController {
  /**
   * @static
   * @param {Request} req express request object
   * @param {Response} res express response object
   * @returns {json} a json object
   */
  static async askQuestion(req: Request, res: Response): Promise<Response> {
    try {
      const { title, body, userId } = req.body;
      const slug = generateSlug(title);
      const response = await AskQuestionUC.execute({
        userId,
        title,
        body,
        slug
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
