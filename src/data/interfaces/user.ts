/* eslint-disable no-unused-vars */
import User from 'core/entities/User';

export default interface UserMethods {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userDetails: User): Promise<User>;
}
