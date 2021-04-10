/* eslint-disable no-unused-vars */
import Question from 'core/entities/Question';
import { QuestionAttributes } from 'data/database/models/Question';
import { AnswerAttributes } from 'data/database/models/Answer';

export type QuestionArray = Array<QuestionAttributes>;

export default interface QuestionInterface {
  create(questionDetails: QuestionAttributes): Promise<Question>;
  findExistingQuestionByTitle(
    title: string
  ): Promise<QuestionAttributes | null>;
  findSimilarQuestionByTitle(title: string): Promise<QuestionArray>;
  findExistingQuestionById(id: number): Promise<QuestionAttributes | null>;
  findAnswerByUserId(
    userId: number | undefined
  ): Promise<AnswerAttributes | null>;
  createAnswer(answerDetails: AnswerAttributes): Promise<void>;
}
