/* eslint-disable no-useless-catch */

import User from 'core/entities/User';
// import { UserAttributes } from 'data/database/models/User';
import UserInterface from 'data/interfaces/user';
import SessionInterface from 'data/interfaces/session';
import SuccessResponse from 'core/definitions/SuccessResponse';
import ErrorResponse from 'core/definitions/ErrorResponse';
import { FinalResponse } from 'core/definitions/CommonTypes';
import { GenerateToken } from 'entrypoint/web/helpers/generateToken';

/**
 * @class RegisterUser
 */
export default class RegisterUser {
  #userInterface: UserInterface;
  #sessionInterface: SessionInterface;
  #generateToken: GenerateToken;

  /**
   * @constructor
   * @param {UserInterface} userInterface UserInterface object to be injected
   * @param {SessionInterface} sessionInterface sessiomInterface object to be injected
   * @param {GenerateToken} generateToken object to be injected
   * @returns {void}
   */
  constructor(
    userInterface: UserInterface,
    sessionInterface: SessionInterface,
    generateToken: GenerateToken
  ) {
    this.#userInterface = userInterface;
    this.#sessionInterface = sessionInterface;
    this.#generateToken = generateToken;
  }

  /**
   *
   * @param {User} userDetails incoming user details to be registered
   * @returns {User} registered user object
   */
  public async execute(userDetails: User): Promise<FinalResponse> {
    try {
      const possibleUser = await this.#userInterface.findByEmail(
        userDetails.email
      );

      if (possibleUser) return ErrorResponse.conflict('user already exists');

      const registeredUser = await this.#userInterface.create(userDetails);
      const userId: number | undefined = registeredUser.id;

      // create session
      const token = this.#generateToken({ id: userId });
      await this.#sessionInterface.create({ userId, token, active: true });

      // return a response
      return SuccessResponse.created('user registered successfully', {
        user: registeredUser,
        token
      });
    } catch (error) {
      throw error;
    }
  }
}
