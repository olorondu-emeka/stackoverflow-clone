import { Op } from 'sequelize';
import Question from 'core/entities/Question';
import QuestionInterface, {
  QuestionArray,
  QuestionNotificationArray
} from 'data/interfaces/question';

import QuestionModel, {
  QuestionAttributes
} from 'data/database/models/Question';
import AnswerModel, { AnswerAttributes } from 'data/database/models/Answer';

import QuestionSubscriptionModel, {
  QuestionSubscriptionAttributes
} from 'data/database/models/QuestionSubscriptions';

import QuestionNotificationModel from 'data/database/models/QuestionNotifications';

/**
 * @class QuestionGateway
 */
export default class QuestionGateway implements QuestionInterface {
  #questionModel: typeof QuestionModel;
  #answerModel: typeof AnswerModel;
  #questionSubscriptionModel: typeof QuestionSubscriptionModel;
  #questionNotificationModel: typeof QuestionNotificationModel;

  /**
   * @constructor
   * @param {Model} questionModel the question model
   * @param {Model} answerModel the question model
   * @param {Model} questionSubscriptionModel the question subscription model
   * @param {Model} questionNotificationModel the question subscription model
   */
  constructor(
    questionModel: typeof QuestionModel,
    answerModel: typeof AnswerModel,
    questionSubscriptionModel: typeof QuestionSubscriptionModel,
    questionNotificationModel: typeof QuestionNotificationModel
  ) {
    this.#questionModel = questionModel;
    this.#answerModel = answerModel;
    this.#questionSubscriptionModel = questionSubscriptionModel;
    this.#questionNotificationModel = questionNotificationModel;
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
      where: { id },
      include: [
        {
          model: AnswerModel
        }
      ]
    });
    return possibleQuestion;
  }

  /**
   *
   * @param {integer} userId user id
   * @param {integer} questionId question id
   * @returns {AnswerAttributes} answer object, if found
   */
  public async findAnswerByUserId(
    userId: number | undefined,
    questionId: number | undefined
  ): Promise<AnswerAttributes | null> {
    const possibleAnswer = await this.#answerModel.findOne({
      where: {
        userId,
        questionId
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

  /**
   *
   * @param {integer} questionId question id
   * @param {integer} totalVotes total votes
   * @returns {void}
   */
  public async updateQuestionVotes(
    questionId: number,
    totalVotes: number
  ): Promise<void> {
    await this.#questionModel.update(
      { votes: totalVotes },
      { where: { id: questionId } }
    );
  }

  /**
   *
   * @param {integer} userId user id
   * @param {integer} questionId question id
   * @returns {void}
   */
  public async createQuestionSubscription(
    userId: number,
    questionId: number
  ): Promise<void> {
    await this.#questionSubscriptionModel.create({ userId, questionId });
  }

  /**
   *
   * @param {integer} userId user id
   * @param {integer} questionId question id
   * @returns {void}
   */
  public async checkExistingSubscription(
    userId: number,
    questionId: number
  ): Promise<QuestionSubscriptionAttributes | null> {
    const possibleSubscription = await this.#questionSubscriptionModel.findOne({
      where: {
        userId,
        questionId
      }
    });

    return possibleSubscription;
  }

  /**
   *
   * @param {integer} questionId the question id
   * @param {integer} notificationMessage the notification message
   * @returns {void}
   */
  public async createNotification(
    questionId: number,
    notificationMessage: string
  ): Promise<void> {
    await this.#questionNotificationModel.create({
      questionId,
      message: notificationMessage
    });
  }

  /**
   *
   * @param {integer} questionId question id
   * @returns {QuestionNotificationArray} array of question notifications
   */
  public async getQuestionNotifications(
    questionId: number
  ): Promise<QuestionNotificationArray> {
    const notifications = await this.#questionNotificationModel.findAll({
      where: {
        questionId
      }
    });
    return notifications;
  }
}
