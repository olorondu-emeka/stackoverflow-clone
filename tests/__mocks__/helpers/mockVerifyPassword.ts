/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

/**
 *
 * @param {string} password input password
 * @param {string} hash hashed password
 * @returns {boolean} true/false
 */
function mockVerifyPasswordTrue(password: string, hash: string): boolean {
  return true;
}

/**
 *
 * @param {string} password input password
 * @param {string} hash hashed password
 * @returns {boolean} true/false
 */
function mockVerifyPasswordFalse(password: string, hash: string): boolean {
  return false;
}

export { mockVerifyPasswordFalse, mockVerifyPasswordTrue };
