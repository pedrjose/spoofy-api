import { Request, Response } from "express";
import createHttpError from "http-errors";

import { asyncWrapper } from "../utils/asyncWrapper";
import { config } from "../../config";
import {
  logger,
  generateTokens,
  convertTimeStrToMillisec,
  sendResponse,
  sendError,
} from "../../helpers";
import { userTokenService } from "../../services/tokenService";
import { messages } from "../../messages";

const refreshTokenController = asyncWrapper(async (req: Request, res: Response) => {
  const { userId, userRole } = req;

  try {
    if (!userId || !userRole) {
      throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
    }

    const refreshToken = req.cookies[config.refreshTokenName];

    const userToken = await userTokenService.findUserTokenByToken(refreshToken);

    if (!userToken) {
      await userTokenService.removeAllUserTokensById(userId);

      logger.warn(
        `The refresh token sent from ${userId} could be used in another device. All devices were signed out.`,
      );
      throw createHttpError(
        403,
        "Refresh token unavailable. You need to perform the sign in again.",
      );
    }

    await userTokenService.removeUserTokenByToken(refreshToken);

    res.clearCookie(config.refreshTokenName);

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(userId, userRole);

    await userTokenService.create(userId, newRefreshToken);

    res.cookie(config.refreshTokenName, newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: config.cookieDomain,
      maxAge: convertTimeStrToMillisec(config.refreshTokenExpiration),
    });

    return sendResponse(res, { token: accessToken }, 200);
  } catch (err) {
    const error = err as Error;

    logger.error(error.message);
    return sendError(res, createHttpError(403, error));
  }
});

export default refreshTokenController;