/* eslint-disable no-useless-catch */

import UserInterface from 'data/interfaces/user';
import SessionInterface from 'data/interfaces/session';
import SuccessResponse from 'core/definitions/SuccessResponse';
import ErrorResponse from 'core/definitions/ErrorResponse';
import { FinalResponse } from 'core/definitions/CommonTypes';
import { GenerateToken } from 'entrypoint/web/helpers/generateToken';
import { VerifyPassword } from 'entrypoint/web/helpers/passwordHelper';

/**
 * @class CreateSession
 */
export default class CreateSession {
  #userInterface: UserInterface;
  #sessionInterface: SessionInterface;
  #generateToken: GenerateToken;
  #verifyPassword: VerifyPassword;

  /**
   * @constructor
   * @param {UserInterface} userInterface UserInterface object to be injected
   * @param {SessionInterface} sessionInterface sessiomInterface object to be injected
   * @param {GenerateToken} generateToken helper function for token generation
   * @param {VerifyPassword} verifyPassword helper function for verifying password
   * @returns {void}
   */
  constructor(
    userInterface: UserInterface,
    sessionInterface: SessionInterface,
    generateToken: GenerateToken,
    verifyPassword: VerifyPassword
  ) {
    this.#userInterface = userInterface;
    this.#sessionInterface = sessionInterface;
    this.#generateToken = generateToken;
    this.#verifyPassword = verifyPassword;
  }

  /**
   *
   * @param {string} email user email
   * @param {string} password user password
   * @returns {json} json object containing token
   */
  public async execute(
    email: string,
    password: string
  ): Promise<FinalResponse> {
    try {
      const possibleUser = await this.#userInterface.findByEmail(email);
      if (!possibleUser) return ErrorResponse.notFound('user does not exist');

      const { id: userId, password: hashedPassword } = possibleUser;
      const passwordMatch = this.#verifyPassword(password, hashedPassword);

      if (!passwordMatch)
        return ErrorResponse.unauthorized('incorrect email or password');

      const existingSession = await this.#sessionInterface.findExistingSessionByUserId(
        userId
      );
      if (!existingSession) {
        // create session
        const token = this.#generateToken({ id: userId });
        await this.#sessionInterface.create({ userId, token, active: true });
        return SuccessResponse.ok('login successful', {
          firstName: possibleUser.firstName,
          lastName: possibleUser.lastName,
          email,
          token
        });
      }

      return SuccessResponse.ok('login successful', {
        firstName: possibleUser.firstName,
        lastName: possibleUser.lastName,
        email,
        token: existingSession.token
      });
    } catch (error) {
      throw error;
    }
  }
}
