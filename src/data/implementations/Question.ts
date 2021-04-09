import { Op } from 'sequelize';
import Question from 'core/entities/Question';
import QuestionModel, { QuestionAttributes } from 'data/database/models/Question';
import QuestionInterface, { QuestionArray } from 'data/interfaces/question';

/**
 * @class QuestionGateway
 */
export default class QuestionGateway implements QuestionInterface {
  #questionModel: typeof QuestionModel;

  /**
   * @constructor
   * @param {Model} questionModel the question model
   */
  constructor(questionModel: typeof QuestionModel) {
    this.#questionModel = questionModel;
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
   *
   * @param {string} title the title of the question
   * @returns {QuestionArray} an array of questions, if found, or an empty array otherwise
   */
  public async findSimilarQuestionByTitle(title: string): Promise<QuestionArray> {
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
}
