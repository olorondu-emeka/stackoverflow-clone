import faker from 'faker';
import { QuestionAttributes } from '../../../src/data/database/models/Question';

interface GenericObject {
  [index: string]: string | number | boolean;
}

/**
 *
 * @returns {QuestionAttributes} Question object
 */
function getNewQuestion(): QuestionAttributes {
  const newQuestion = {
    userId: faker.datatype.number(10),
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    slug: faker.lorem.slug()
  };

  return newQuestion;
}

/**
 * @returns {GenericObject} bad Question object
 */
function getBadQuestion(): GenericObject {
  const badQuestion = {
    userId: faker.datatype.number(10),
    title: faker.lorem.sentence()
  };

  return badQuestion;
}

export { getNewQuestion, getBadQuestion };
