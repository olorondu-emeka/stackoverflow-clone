/* eslint-disable no-unused-vars */
import Session from 'core/entities/Session';

export default interface SessionInterface {
  create(sessionDetails: Session): Promise<Session | null>;

  findExistingSessionByToken(
    userId: number,
    token: string
  ): Promise<Session | null>;

  findExistingSessionByUserId(userId: number): Promise<Session | null>;
  updateTokenStatus(token: string): Promise<void>;
}
