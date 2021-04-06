/* eslint-disable no-unused-vars */
import User from 'core/entities/User';
import { UserAttributes } from 'data/database/models/User';

export default interface UserMethods {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userDetails: UserAttributes): Promise<User>;
}
