import { Request, Response } from "express";
import { ExtractJwt } from "passport-jwt";
import createHttpError from "http-errors";

import { config } from "../../config";
import { messages } from "../../messages";
import { asyncWrapper } from "../utils/asyncWrapper";
import { convertTimeStrToMillisec, logger, sendError, sendResponse } from "../../helpers";
import { tokenBlockListService } from "../../services/tokenBlockListService";
import { userTokenService } from "../../services/tokenService";

const logoutController = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { tokenExp } = req;

    const refreshToken = req.cookies[config.refreshTokenName];
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    await userTokenService.removeUserTokenByToken(refreshToken);

    if (accessToken) {
      await tokenBlockListService.addTokenToBlocklist(
        accessToken,
        tokenExp ?? convertTimeStrToMillisec(config.accessTokenExpiration),
      );
    }

    res.clearCookie(config.refreshTokenName);

    return sendResponse(res, messages.SUCCESS_LOGOUT, 200);
  } catch (err) {
    const error = err as Error;

    logger.error(error.message);
    return sendError(res, createHttpError(403, error));
  }
});

export default logoutController;