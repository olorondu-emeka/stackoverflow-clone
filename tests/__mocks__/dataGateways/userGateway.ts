/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import UserInterface from '../../../src/data/interfaces/user';
import User from '../../../src/core/entities/User';
import { getNewUser } from '../entities/user';

/**
 * @class MockUserGateway
 */
export default class MockUserGateway implements UserInterface {
  #user: User | null;

  /**
   * @constructor
   * @returns {void}
   */
  constructor() {
    this.#user = getNewUser();
  }

  /**
   * @param {User} user user to be set
   * @returns {void}
   */
  public setUser(user: User | null): void {
    this.#user = user;
  }

  /**
   * @returns {void}
   */
  public resetDefault(): void {
    this.#user = getNewUser();
  }

  /**
   *
   * @param {string} email incoming email
   * @returns {User} user
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.#user;
  }

  /**
   *
   * @param {number} id id
   * @returns {User} user
   */
  async findById(id: number): Promise<User | null> {
    return this.#user;
  }

  /**
   *
   * @param {User} userDetails user details
   * @returns {User} created user
   */
  async create(userDetails: User): Promise<User> {
    return getNewUser();
  }
}
