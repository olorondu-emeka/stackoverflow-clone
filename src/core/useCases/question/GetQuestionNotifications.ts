/* eslint-disable no-useless-catch */

import QuestionInterface from 'data/interfaces/question';
import SuccessResponse from 'core/definitions/SuccessResponse';
import ErrorResponse from 'core/definitions/ErrorResponse';
import { FinalResponse } from 'core/definitions/CommonTypes';

/**
 * @class GetQuestionNotifications
 */
export default class GetQuestionNotifications {
  #questionInterface: QuestionInterface;

  /**
   * @constructor
   * @param {QuestionInterface} questionInterface question interface
   * @returns {void}
   */
  constructor(questionInterface: QuestionInterface) {
    this.#questionInterface = questionInterface;
  }

  /**
   *
   * @param {string} userId user id
   * @param {string} questionId question id
   * @returns {Finalresponse} final response
   */
  public async execute(
    userId: number,
    questionId: number
  ): Promise<FinalResponse> {
    try {
      const possibleQuestion = await this.#questionInterface.findExistingQuestionById(
        questionId
      );

      if (!possibleQuestion)
        return ErrorResponse.notFound('question does not exist');

      const possibleSubscription = await this.#questionInterface.checkExistingSubscription(
        userId,
        questionId
      );

      if (!possibleSubscription)
        return ErrorResponse.notFound('subscription does not exist');

      const notifications = await this.#questionInterface.getQuestionNotifications(
        questionId
      );

      return SuccessResponse.ok('notifications retrieved successfully', {
        notifications
      });
    } catch (error) {
      throw error;
    }
  }
}
