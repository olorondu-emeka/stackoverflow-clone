/* eslint-disable no-useless-catch */

import QuestionInterface from 'data/interfaces/question';
import SuccessResponse from 'core/definitions/SuccessResponse';
import ErrorResponse from 'core/definitions/ErrorResponse';
import { FinalResponse } from 'core/definitions/CommonTypes';
import { QuestionAttributes } from 'data/database/models/Question';

/**
 * @class AskQuestion
 */
export default class AskQuestion {
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
   * @async
   * @param {QuestionAttributes} questionDetails details for question to be asked
   * @returns {Question} registered question object
   */
  public async execute(
    questionDetails: QuestionAttributes
  ): Promise<FinalResponse> {
    try {
      const possibleQuestion = await this.#questionInterface.findExistingQuestionByTitle(
        questionDetails.title
      );
      if (possibleQuestion)
        return ErrorResponse.conflict('question already exists');

      const registeredQuestion = await this.#questionInterface.create(
        questionDetails
      );
      // const similarQuestions = await this.#questionInterface.findSimilarQuestionByTitle(
      //   questionDetails.title
      // );

      if (!questionDetails.userId)
        return ErrorResponse.serverError(
          'questionDetails.userId does not exist!'
        );
      if (!registeredQuestion.id)
        return ErrorResponse.serverError(
          'registeredQuestion.id does not exist!'
        );

      await this.#questionInterface.createQuestionSubscription(
        questionDetails.userId,
        registeredQuestion.id
      );
      return SuccessResponse.created('question registered successfully', {
        question: registeredQuestion
      });
    } catch (error) {
      throw error;
    }
  }
}
