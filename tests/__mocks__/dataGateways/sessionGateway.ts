/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import SessionInterface from '../../../src/data/interfaces/session';
import Session from '../../../src/core/entities/Session';
import { getNewSession } from '../entities/Session';
import { SessionAttributes } from '../../../src/data/database/models/Session';

/**
 * @class MockSessionGateway
 */
export default class MockSessionGateway implements SessionInterface {
  #session: Session | null;

  /**
   * @constructor
   * @returns {void}
   */
  constructor() {
    this.#session = getNewSession();
  }

  /**
   * @param {Session} session session to be set
   */
  public set setSession(session: Session | null) {
    this.#session = session;
  }

  /**
   *
   * @param {Session} sessionDetails session details
   * @returns {Session} created session
   */
  async create(sessionDetails: Session): Promise<SessionAttributes | null> {
    return this.#session;
  }

  /**
   *
   * @param {integer} userId the userId
   * @param {string} token incoming token
   * @returns {json} a session object, if it exists
   */
  public async findExistingSessionByToken(
    userId: number | undefined,
    token: string
  ): Promise<SessionAttributes | null> {
    return this.#session;
  }

  /**
   *
   * @param {integer} userId the userId
   * @returns {json} a session object, if it exists
   */
  public async findExistingSessionByUserId(userId: number): Promise<Session | null> {
    return this.#session;
  }

  /**
   *
   * @param {string} token session token
   * @returns {void}
   */
  public async updateTokenStatus(token: string): Promise<void> {}
}
