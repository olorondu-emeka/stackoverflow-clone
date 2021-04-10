/* eslint-disable no-useless-catch */

import QuestionInterface from 'data/interfaces/question';
import SuccessResponse from 'core/definitions/SuccessResponse';
import ErrorResponse from 'core/definitions/ErrorResponse';
import { FinalResponse } from 'core/definitions/CommonTypes';
import { AnswerAttributes } from 'data/database/models/Answer';

/**
 * @class AnswerQuestion
 */
export default class AnswerQuestion {
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
   * @param {AnswerAttributes} answerDetails answer details
   * @returns {FinalResponse} final response
   */
  public async execute(
    answerDetails: AnswerAttributes
  ): Promise<FinalResponse> {
    try {
      const possibleQuestion = await this.#questionInterface.findExistingQuestionById(
        answerDetails.questionId
      );
      if (!possibleQuestion)
        return ErrorResponse.notFound('question does not exist');

      const possibleAnswer = await this.#questionInterface.findAnswerByUserId(
        answerDetails.userId
      );
      if (possibleAnswer)
        return ErrorResponse.conflict('you have already answered this qestion');

      await this.#questionInterface.createAnswer(answerDetails);
      return SuccessResponse.created('answer submitted successfully', {});
    } catch (error) {
      throw error;
    }
  }
}
