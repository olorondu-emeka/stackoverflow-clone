import User from 'core/entities/User';
import UserModel, { UserAttributes } from 'data/database/models/User';
import UserInterface from 'data/interfaces/user';

/**
 * @class UserGateway
 */
export default class UserGateway implements UserInterface {
  #userModel: typeof UserModel;

  /**
   * @constructor
   * @param {Model} userModel the user model
   */
  constructor(userModel: typeof UserModel) {
    this.#userModel = userModel;
  }

  /**
   *
   * @param {integer} id the user id
   * @returns {json} user object, if it exists
   */
  public async findById(id: number): Promise<User | null> {
    const possibleUser = await this.#userModel.findOne({
      where: { id }
    });
    if (possibleUser) return possibleUser;
    return null;
  }

  /**
   *
   * @param {string} email user's email address
   * @returns {json} user object, if it exists
   */
  public async findByEmail(email: string): Promise<User | null> {
    const possibleUser = await this.#userModel.findOne({
      where: { email }
    });
    if (possibleUser) return possibleUser;
    return null;
  }

  /**
   *
   * @param {object} userDetails user details to be used for creation
   * @returns {json} created user json object
   */
  public async create(userDetails: UserAttributes): Promise<User> {
    const createdUser = await this.#userModel.create(userDetails);
    return createdUser;
  }
}
