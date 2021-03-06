/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import ErrorResponse from 'core/definitions/ErrorResponse';
import generateSlug from 'entrypoint/web/helpers/generateSlug';
import generateResponse from 'entrypoint/web/helpers/generateResponse';
import {
  AskQuestionUC,
  AnswerQuestionUC,
  VoteQuestionUC,
  SubscribeToQuestionUC,
  GetQuestionNotificationsUC,
  GetQuestionUC
} from 'config/UseCases';

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
      //@ts-ignore
      const userId = req.user.id;
      const { title, body } = req.body;
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
      console.error(error);
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
  static async answerQuestion(req: Request, res: Response): Promise<Response> {
    try {
      //@ts-ignore
      const { id: userId, firstName, lastName } = req.user;
      const questionId = parseInt(req.params.questionId);
      const { body } = req.body;

      const response = await AnswerQuestionUC.execute(
        {
          userId,
          questionId,
          body
        },
        firstName,
        lastName
      );

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
  static async voteQuestion(req: Request, res: Response): Promise<Response> {
    try {
      const questionId = parseInt(req.params.questionId);
      const { voteOption } = req.query;

      const response = await VoteQuestionUC.execute(
        questionId,
        `${voteOption}`
      );
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
  static async subscribeToQuestion(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      //@ts-ignore
      const userId = req.user.id;
      const questionId = parseInt(req.params.questionId);

      const response = await SubscribeToQuestionUC.execute(userId, questionId);
      const { statusCode, data } = response;
      return generateResponse(res, statusCode, data);
    } catch (error) {
      console.error('error', error);

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
  static async getQuestionNotifications(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      //@ts-ignore
      const userId = req.user.id;
      const questionId = parseInt(req.params.questionId);

      const response = await GetQuestionNotificationsUC.execute(
        userId,
        questionId
      );

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
  static async getQuestion(req: Request, res: Response): Promise<Response> {
    try {
      const questionId = parseInt(req.params.questionId);

      const response = await GetQuestionUC.execute(questionId);
      const { statusCode, data } = response;
      return generateResponse(res, statusCode, data);
    } catch (error) {
      const errorResponse = ErrorResponse.serverError(error.message);
      const { statusCode, data } = errorResponse;
      return generateResponse(res, statusCode, data);
    }
  }
}
