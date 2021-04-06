/* eslint-disable no-unused-vars */

import jwt from 'jsonwebtoken';
import appPath from 'app-root-path';
import dotenv from 'dotenv';

dotenv.config({ path: `${appPath}/.env` });

export interface TokenPayload {
  [index: string]: string | number | undefined;
}

export interface GenerateToken {
  (payload: TokenPayload, expiresIn?: string): string;
}

/**
 *
 * @param {string} payload
 * @param {time} expiresIn
 * @returns {base64String} jwt
 */
const generateToken = (payload: TokenPayload, expiresIn?: string): string => {
  const tokenSecret: string = process.env.TOKEN_SECRET || 'token_secret';

  if (!expiresIn) return jwt.sign(payload, tokenSecret);
  return jwt.sign(payload, tokenSecret, { expiresIn });
};

export default generateToken;
