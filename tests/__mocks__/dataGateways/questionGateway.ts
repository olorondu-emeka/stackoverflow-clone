/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import QuestionInterface from '../../../src/data/interfaces/question';
import Question from '../../../src/core/entities/Question';
import { getNewQuestion } from '../entities/question';
import { QuestionAttributes } from '../../../src/data/database/models/Question';

export type QuestionArray = Array<QuestionAttributes>;

/**
 * @class QuestionGateway
 */
export default class QuestionGateway implements QuestionInterface {
  #question: Question | null;

  /**
   * @constructor
   * @returns {void}
   */
  constructor() {
    this.#question = getNewQuestion();
  }

  /**
   * @param {Question} question question to be set
   * @returns {void}
   */
  public setQuestion(question: Question | null): void {
    this.#question = question;
  }

  /**
   * @returns {void}
   */
  public resetDefault(): void {
    this.#question = getNewQuestion();
  }

  /**
   *
   * @param {Question} questionDetails details of the question to be created
   * @returns {Question} the created question
   */
  public async create(questionDetails: Question): Promise<Question> {
    return getNewQuestion();
  }

  /**
   *
   * @param {string} title question title
   * @returns {Question}  returns question if found, or null otherwise
   */
  public async findExistingQuestionByTitle(
    title: string
  ): Promise<QuestionAttributes | null> {
    return this.#question;
  }

  /**
   *
   * @param {string} title the title of the question
   * @returns {QuestionArray} an array of questions, if found, or an empty array otherwise
   */
  public async findSimilarQuestionByTitle(
    title: string
  ): Promise<QuestionArray> {
    return [getNewQuestion()];
  }
}
