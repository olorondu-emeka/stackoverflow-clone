/* eslint-disable no-useless-catch */

import QuestionInterface from 'data/interfaces/question';
import SuccessResponse from 'core/definitions/SuccessResponse';
import ErrorResponse from 'core/definitions/ErrorResponse';
import { FinalResponse } from 'core/definitions/CommonTypes';

/**
 * @class VoteQuestion
 */
export default class VoteQuestion {
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
   * @param {string} questionId question id
   * @param {string} voteOption upvote/downvote
   * @returns {json} json object containing response
   */
  public async execute(
    questionId: number,
    voteOption: string
  ): Promise<FinalResponse> {
    try {
      const possibleQuestion = await this.#questionInterface.findExistingQuestionById(
        questionId
      );
      if (!possibleQuestion)
        return ErrorResponse.notFound('question does not exist');

      if (
        possibleQuestion.votes === null ||
        possibleQuestion.votes === undefined
      )
        return ErrorResponse.serverError('votes is undefined!');

      let totalVotes: number = possibleQuestion.votes;
      switch (voteOption) {
      case 'upvote':
        totalVotes += 1;
        break;
      case 'downvote':
        totalVotes -= 1;
        break;
      default:
        totalVotes += 0;
        break;
      }

      await this.#questionInterface.updateQuestionVotes(questionId, totalVotes);
      return SuccessResponse.ok('votes updated successfully', {});
    } catch (error) {
      throw error;
    }
  }
}
