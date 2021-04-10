/* eslint-disable no-unused-vars */
import Session from 'core/entities/Session';
import { SessionAttributes } from 'data/database/models/Session';

export default interface SessionInterface {
  create(sessionDetails: Session): Promise<SessionAttributes | null>;

  findExistingSessionByToken(
    userId: number,
    token: string
  ): Promise<SessionAttributes | null>;

  findExistingSessionByUserId(
    userId: number | undefined
  ): Promise<SessionAttributes | null>;
  updateTokenStatus(token: string): Promise<void>;
}
