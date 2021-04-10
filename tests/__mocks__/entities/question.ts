import faker from 'faker';

interface GenericObject {
  [index: string]: string | number | boolean;
}

/**
 *
 * @returns {QuestionAttributes} Question object
 */
function getNewQuestion(): GenericObject {
  const newQuestion = {
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

export { getNewQuestion, getBadQuestion };
