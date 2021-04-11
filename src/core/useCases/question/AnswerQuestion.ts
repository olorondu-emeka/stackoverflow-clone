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
   * @param {string} firstName user first name
   * @param {string} lastName user last name
   * @returns {FinalResponse} final response
   */
  public async execute(
    answerDetails: AnswerAttributes,
    firstName: string,
    lastName: string
  ): Promise<FinalResponse> {
    try {
      const possibleQuestion = await this.#questionInterface.findExistingQuestionById(
        answerDetails.questionId
      );
      if (!possibleQuestion)
        return ErrorResponse.notFound('question does not exist');

      if (!possibleQuestion.id)
        return ErrorResponse.serverError('possibleQuestion.id does not exist!');

      const possibleAnswer = await this.#questionInterface.findAnswerByUserId(
        answerDetails.userId,
        possibleQuestion.id
      );
      if (possibleAnswer)
        return ErrorResponse.conflict('you have already answered this qestion');

      // upgrade suggestion: use a database transaction for createAnswer and createNotification operations
      await this.#questionInterface.createAnswer(answerDetails);

      const notificationMessage = `Question(${possibleQuestion.title}) has just been answered by ${firstName} ${lastName}. Go check it out!`;
      await this.#questionInterface.createNotification(
        possibleQuestion.id,
        notificationMessage
      );
      return SuccessResponse.created('answer submitted successfully', {});
    } catch (error) {
      throw error;
    }
  }
}
