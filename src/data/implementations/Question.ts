import { Op } from 'sequelize';
import Question from 'core/entities/Question';
import QuestionModel, {
  QuestionAttributes
} from 'data/database/models/Question';
import AnswerModel, { AnswerAttributes } from 'data/database/models/Answer';
import QuestionInterface, { QuestionArray } from 'data/interfaces/question';

/**
 * @class QuestionGateway
 */
export default class QuestionGateway implements QuestionInterface {
  #questionModel: typeof QuestionModel;
  #answerModel: typeof AnswerModel;

  /**
   * @constructor
   * @param {Model} questionModel the question model
   * @param {Model} answerModel the question model
   */
  constructor(
    questionModel: typeof QuestionModel,
    answerModel: typeof AnswerModel
  ) {
    this.#questionModel = questionModel;
    this.#answerModel = answerModel;
  }

  /**
   *
   * @param {Question} questionDetails details of the question to be created
   * @returns {Question} the created question
   */
  public async create(questionDetails: Question): Promise<Question> {
    const createdQuestion = await this.#questionModel.create(questionDetails);
    return createdQuestion;
  }

  /**
   *
   * @param {string} title question title
   * @returns {Question}  returns question if found, or null otherwise
   */
  public async findExistingQuestionByTitle(
    title: string
  ): Promise<QuestionAttributes | null> {
    const possibleQuestion = await this.#questionModel.findOne({
      where: {
        title
      }
    });
    return possibleQuestion;
  }

  /**
   * currently incorrect
   * @param {string} title the title of the question
   * @returns {QuestionArray} an array of questions, if found, or an empty array otherwise
   */
  public async findSimilarQuestionByTitle(
    title: string
  ): Promise<QuestionArray> {
    const titleArray = title.split(' ').map((title) => `%${title}%`);
    const possibleQuestions = await this.#questionModel.findAll({
      where: {
        [Op.and]: {
          title: {
            [Op.like]: titleArray
          }
        }
      }
    });
    return possibleQuestions;
  }

  /**
   * @param {number} id question id
   * @returns {QuestionAttributes} question object, if found
   */
  public async findExistingQuestionById(
    id: number
  ): Promise<QuestionAttributes | null> {
    const possibleQuestion = await this.#questionModel.findOne({
      where: { id }
    });
    return possibleQuestion;
  }

  /**
   *
   * @param {integer} userId user id
   * @returns {AnswerAttributes} answer object, if found
   */
  public async findAnswerByUserId(
    userId: number | undefined
  ): Promise<AnswerAttributes | null> {
    const possibleAnswer = await this.#answerModel.findOne({
      where: {
        userId
      }
    });
    return possibleAnswer;
  }

  /**
   *
   * @param {AnswerAttributes} answerDetails answer details
   * @returns {void}
   */
  public async createAnswer(answerDetails: AnswerAttributes): Promise<void> {
    await this.#answerModel.create(answerDetails);
  }
}
