import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import passport from "passport";

import { config } from "../../config";
import {
  convertTimeStrToMillisec,
  generateTokens,
  logger,
  sendError,
  sendResponse,
} from "../../helpers";
import { messages } from "../../messages";
import { userTokenService } from "../../services/tokenService";
import { User } from "../../types";
import { asyncWrapper } from "../utils/asyncWrapper";

function promisifiedPassportLocalAuthentication(req: Request, res: Response, next: NextFunction) {
  return new Promise<{ user: User; accessToken: string; refreshToken: string }>(
    (resolve, reject) => {
      passport.authenticate(
        "local",
        { session: false },
        (err: Error, user: User, info: { message: string }) => {
          if (err) {
            return reject(createHttpError(500, err));
          }

          if (!user) {
            const { message } = info;
            return reject(createHttpError(401, message));
          }

          const { accessToken, refreshToken } = generateTokens(user.id, user.role);

          return resolve({ user, accessToken, refreshToken });
        },
      )(req, res, next);
    },
  );
}

const loginController = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      user,
      accessToken,
      refreshToken: newRefreshToken,
    } = await promisifiedPassportLocalAuthentication(req, res, next);

    const { refreshToken: existingRefreshToken } = req.cookies;

    if (existingRefreshToken) {
      const userToken = await userTokenService.findUserTokenByToken(existingRefreshToken);

      if (!userToken) {
        logger.warn(
          `The refresh token sent from ${user.id} could be used in another device. All devices were signed out`,
        );

        await userTokenService.removeAllUserTokensById(user.id);
      } else {
        await userTokenService.removeUserTokenById(user.id);
      }

      res.clearCookie(config.refreshTokenName);
    }

    await userTokenService.create(user.id, newRefreshToken);

    res.cookie(config.refreshTokenName, newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: config.cookieDomain,
      maxAge: convertTimeStrToMillisec(config.refreshTokenExpiration),
    });

    return sendResponse(res, { token: accessToken }, 201);
  } catch (err) {
    const error = err as Error;

    logger.error(error.message);

    if (error.message === messages.INVALID_TOKEN || error.message === messages.NO_AUTH_TOKEN) {
      return sendError(res, createHttpError(401, error));
    }

    return sendError(res, error);
  }
});

export default loginController;