/* eslint-disable no-unused-vars */
import Question from 'core/entities/Question';
import { QuestionAttributes } from 'data/database/models/Question';
import { AnswerAttributes } from 'data/database/models/Answer';
import { QuestionSubscriptionAttributes } from 'data/database/models/QuestionSubscriptions';
import { QuestionNotificationAttributes } from 'data/database/models/QuestionNotifications';

export type QuestionArray = Array<QuestionAttributes>;
export type QuestionNotificationArray = Array<QuestionNotificationAttributes>;

export default interface QuestionInterface {
  create(questionDetails: QuestionAttributes): Promise<Question>;

  findExistingQuestionByTitle(
    title: string
  ): Promise<QuestionAttributes | null>;

  findSimilarQuestionByTitle(title: string): Promise<QuestionArray>;
  findExistingQuestionById(id: number): Promise<QuestionAttributes | null>;

  findAnswerByUserId(
    userId: number | undefined,
    questionId: number | undefined
  ): Promise<AnswerAttributes | null>;

  createAnswer(answerDetails: AnswerAttributes): Promise<void>;

  updateQuestionVotes(questionId: number, totalVotes: number): Promise<void>;
  createQuestionSubscription(userId: number, questionId: number): Promise<void>;
  checkExistingSubscription(
    userId: number,
    questionId: number
  ): Promise<QuestionSubscriptionAttributes | null>;

  createNotification(
    questionId: number,
    notificationMessage: string
  ): Promise<void>;

  getQuestionNotifications(
    questionId: number
  ): Promise<QuestionNotificationArray>;
}
