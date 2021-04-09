import faker from 'faker';
import { UserAttributes } from '../../../src/data/database/models/User';

interface GenericObject {
  [index: string]: string | number | boolean;
}

/**
 *
 * @returns {UserAttributes} User object
 */
function getNewUser(): UserAttributes {
  const newUser = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password'
  };

  return newUser;
}

/**
 * @returns {GenericObject} bad user object
 */
function getBadUser(): GenericObject {
  const badUser = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  };

  return badUser;
}

export { getNewUser, getBadUser };
