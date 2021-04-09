import faker from 'faker';
import { SessionAttributes } from '../../../src/data/database/models/Session';

interface GenericObject {
  [index: string]: string | number | boolean;
}

/**
 *
 * @returns {SessionAttributes} Session object
 */
function getNewSession(): SessionAttributes {
  const newSession = {
    userId: faker.datatype.number(10),
    token: faker.internet.password(),
    active: faker.datatype.boolean()
  };

  return newSession;
}

/**
 * @returns {GenericObject} bad Session object
 */
function getBadSession(): GenericObject {
  const badSession = {
    userId: faker.datatype.number(10),
    token: faker.internet.password()
  };

  return badSession;
}

export { getNewSession, getBadSession };
