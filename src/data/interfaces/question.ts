/* eslint-disable no-unused-vars */
import Question from 'core/entities/Question';
import { QuestionAttributes } from 'data/database/models/Question';

export default interface QuestionInterface {
  create(QuestionDetails: Question): Promise<QuestionAttributes | null>;

  findSimilarQuestionByTitle(title: string): Promise<QuestionAttributes | null>;
}
