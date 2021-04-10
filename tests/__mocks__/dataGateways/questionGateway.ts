/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import QuestionInterface from '../../../src/data/interfaces/question';
import Question from '../../../src/core/entities/Question';
import Answer from '../../../src/core/entities/Answer';
import { getNewQuestion, getNewAnswer } from '../entities/question';
import { QuestionAttributes } from '../../../src/data/database/models/Question';
import { AnswerAttributes } from '../../../src/data/database/models/Answer';

export type QuestionArray = Array<QuestionAttributes>;

/**
 * @class QuestionGateway
 */
export default class QuestionGateway implements QuestionInterface {
  #question: Question | null;
  #answer: Answer | null;

  /**
   * @constructor
   * @returns {void}
   */
  constructor() {
    this.#question = getNewQuestion();
    this.#answer = getNewAnswer();
  }

  /**
   * @param {Question} question question to be set
   * @returns {void}
   */
  public setQuestion(question: Question | null): void {
    this.#question = question;
  }

  /**
   * @param {Answer} answer answer to be set
   * @returns {void}
   */
  public setAnswer(answer: Answer | null): void {
    this.#answer = answer;
  }

  /**
   * @returns {void}
   */
  public resetDefault(): void {
    this.#question = getNewQuestion();
    this.#answer = getNewAnswer();
  }

  /**
   * @returns {void}
   */
  public addVotes(): void {
    if (!this.#question) {
      this.#question = getNewQuestion();
    }
    this.#question.votes = 12;
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

  /**
   * @param {number} id question id
   * @returns {QuestionAttributes} question object, if found
   */
  public async findExistingQuestionById(
    id: number
  ): Promise<QuestionAttributes | null> {
    return this.#question;
  }

  /**
   *
   * @param {integer} userId user id
   * @param {integer} questionId user id
   * @returns {AnswerAttributes} answer object, if found
   */
  public async findAnswerByUserId(
    userId: number | undefined,
    questionId: number | undefined
  ): Promise<AnswerAttributes | null> {
    return this.#answer;
  }

  /**
   *
   * @param {AnswerAttributes} answerDetails answer details
   * @returns {void}
   */
  public async createAnswer(answerDetails: AnswerAttributes): Promise<void> {}

  /**
   *
   * @param {number} questionId question id
   * @param {number} totalVotes total votes
   * @returns {void}
   */
  public async updateQuestionVotes(
    questionId: number,
    totalVotes: number
  ): Promise<void> {}
}
