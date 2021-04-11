/* eslint-disable no-useless-catch */

import QuestionInterface from 'data/interfaces/question';
import SuccessResponse from 'core/definitions/SuccessResponse';
import ErrorResponse from 'core/definitions/ErrorResponse';
import { FinalResponse } from 'core/definitions/CommonTypes';

/**
 * @class SubscribeToQuestion
 */
export default class SubscribeToQuestion {
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
   * @param {integer} userId user id
   * @param {integer} questionId question id
   * @returns {FinalResponse} final response
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
      if (possibleSubscription)
        return ErrorResponse.conflict(
          'you have already subscribed to this question'
        );

      await this.#questionInterface.createQuestionSubscription(
        userId,
        questionId
      );

      return SuccessResponse.created('subscription successful', {});
    } catch (error) {
      throw error;
    }
  }
}
