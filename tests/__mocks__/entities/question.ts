import faker from 'faker';
import Question from '../../../src/core/entities/Question';
import Answer from '../../../src/core/entities/Answer';

interface GenericObject {
  [index: string]: string | number | boolean;
}

/**
 *
 * @returns {QuestionAttributes} Question object
 */
function getNewQuestion(): Question {
  const newQuestion = {
    userId: 1,
    title: faker.lorem.word(),
    body: faker.lorem.sentence(),
    slug: faker.lorem.slug()
  };

  return newQuestion;
}

/**
 * @returns {GenericObject} bad Question object
 */
function getBadQuestion(): GenericObject {
  const badQuestion = {
    title: faker.lorem.sentence()
  };

  return badQuestion;
}

/**
 *
 * @returns {AnswerAttributes} new answer
 */
function getNewAnswer(): Answer {
  const newAnswer = {
    questionId: 1,
    userId: 1,
    body: faker.lorem.sentence()
  };
  return newAnswer;
}

/**
 *
 * @returns {AnswerAttributes} new answer
 */
function getBadAnswer(): GenericObject {
  const badAnswer = {
    questionId: 1,
    userId: 1
  };
  return badAnswer;
}

export { getNewQuestion, getBadQuestion, getNewAnswer, getBadAnswer };
