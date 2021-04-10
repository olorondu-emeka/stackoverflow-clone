/* eslint-disable no-useless-catch */

import SessionInterface from 'data/interfaces/session';
import SuccessResponse from 'core/definitions/SuccessResponse';
import { FinalResponse } from 'core/definitions/CommonTypes';

/**
 * @class DestroySession
 */
export default class DestroySession {
  #sessionInterface: SessionInterface;

  /**
   * @constructor
   * @param {SessionInterface} sessionInterface session interface
   *
   */
  constructor(sessionInterface: SessionInterface) {
    this.#sessionInterface = sessionInterface;
  }

  /**
   *
   * @param {string} token user token
   * @returns {FinalResponse} final response returned
   */
  public async execute(token: string): Promise<FinalResponse> {
    try {
      await this.#sessionInterface.updateTokenStatus(token);
      return SuccessResponse.ok('logout successful', {});
    } catch (error) {
      throw error;
    }
  }
}
