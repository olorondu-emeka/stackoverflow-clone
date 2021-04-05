import bcrypt from 'bcryptjs';

/**
 * @export
 * @class passwordHelper
 */
export default class PasswordHelper {
  /**
   *
   * @param {string} password
   * @returns {string} Encrypted password
   */
  static hash(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
  }

  /**
   *
   * @param {string} password user password
   * @param {string} hash user encrypted password
   * @returns {boolean} true is password = hash, else false
   *
   */
  static verify(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
