/* eslint-disable no-useless-catch */

import QuestionInterface from 'data/interfaces/question';
import SuccessResponse from 'core/definitions/SuccessResponse';
import ErrorResponse from 'core/definitions/ErrorResponse';
import { FinalResponse } from 'core/definitions/CommonTypes';

/**
 * @class GetQuestion
 */
export default class GetQuestion {
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
   * @param {integer} questionId question id
   * @returns {FinalResponse} final response
   */
  public async execute(questionId: number): Promise<FinalResponse> {
    try {
      const possibleQuestion = await this.#questionInterface.findExistingQuestionById(
        questionId
      );

      if (!possibleQuestion)
        return ErrorResponse.notFound('question does not exist');

      return SuccessResponse.ok('questions retrieved successfully', {
        question: possibleQuestion
      });
    } catch (error) {
      throw error;
    }
  }
}
