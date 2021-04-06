import Session from 'core/entities/Session';
import SessionModel, { SessionAttributes } from 'data/database/models/Session';
import SessionInterface from 'data/interfaces/session';

/**
 * @class SessionGateway
 */
export default class SessionGateway implements SessionInterface {
  #sessionModel: typeof SessionModel;

  /**
   * @constructor
   * @param {Model} sessionModel the session model
   */
  constructor(sessionModel: typeof SessionModel) {
    this.#sessionModel = sessionModel;
  }

  /**
   *
   * @param {object} sessionDetails the session details necessary for creation
   * @returns {json} a created session object
   */
  public async create(sessionDetails: Session): Promise<SessionAttributes> {
    const createdSession = await this.#sessionModel.create(sessionDetails);
    return createdSession;
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
    const possibleSession = await this.#sessionModel.findOne({
      where: {
        userId,
        token,
        active: true
      }
    });
    if (possibleSession) return possibleSession;
    return null;
  }

  /**
   *
   * @param {integer} userId the userId
   * @returns {json} a session object, if it exists
   */
  public async findExistingSessionByUserId(
    userId: number
  ): Promise<SessionAttributes | null> {
    const possibleSession = await this.#sessionModel.findOne({
      where: {
        userId,
        active: true
      }
    });
    if (possibleSession) return possibleSession;
    return null;
  }

  /**
   *
   * @param {string} token session token
   * @returns {void}
   */
  public async updateTokenStatus(token: string): Promise<void> {
    await this.#sessionModel.update({ active: false }, { where: { token } });
  }
}
