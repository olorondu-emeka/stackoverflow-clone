/* eslint-disable @typescript-eslint/ban-ts-comment */

import { config } from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import appPath from 'app-root-path';
import ErrorResponse from 'core/definitions/ErrorResponse';
import UserModel from 'data/database/models/User';
import SessionModel from 'data/database/models/Session';
import UserDataGateway from 'data/implementations/User';
import SessionDataGateway from 'data/implementations/Session';
import generateResponse from 'entrypoint/web/helpers/generateResponse';

config({ path: `${appPath}/.env` });

const UserGateway = new UserDataGateway(UserModel);
const SessionGateway = new SessionDataGateway(SessionModel);

/**
 * @name verifyUserToken
 * @param {object} req express object
 * @param {object} res express object
 * @param {object} next
 * @return {string} object
 */
const verifyUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const token: string =
      `${req.headers.authorization}` || `${req.query.token}`;

    if (!token || token === 'null' || token === 'undefined') {
      const { statusCode, data } = ErrorResponse.unauthorized(
        'kindly login to proceed'
      );
      return generateResponse(res, statusCode, data);
    }

    const tokenSecret = process.env.TOKEN_SECRET || 'token_secret';
    const decoded = await jwt.verify(token, tokenSecret);

    // @ts-ignore
    const decodedId = decoded.id;

    const user = await UserGateway.findById(decodedId);

    if (!user) {
      const { statusCode, data } = ErrorResponse.notFound(
        'user does not exist'
      );
      return generateResponse(res, statusCode, data);
    }

    // check if user has an existing session with token
    const possibleSession = await SessionGateway.findExistingSessionByToken(
      decodedId,
      token
    );
    if (!possibleSession) {
      const { statusCode, data } = ErrorResponse.unauthorized(
        'kindly login again'
      );
      return generateResponse(res, statusCode, data);
    }

    // @ts-ignore
    req.user = user;
    next();
  } catch (error) {
    const token: string =
      `${req.headers.authorization}` || `${req.query.token}`;

    let errorMessage = 'invalid auth credentials';

    if (error.message === 'jwt expired') {
      errorMessage = 'kindly login again';
    }

    await SessionGateway.updateTokenStatus(token);
    const { statusCode, data } = ErrorResponse.serverError(errorMessage);
    return generateResponse(res, statusCode, data);
  }
};

export default verifyUserToken;
