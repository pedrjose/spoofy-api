import { Request, Response } from "express";
import createHttpError from "http-errors";

import { hashPassword, logger, sendError, sendResponse } from "../../helpers";
import { IPlaylist } from "../../interfaces/User";
import { messages } from "../../messages";
import { userService } from "../../services/userService";
import { asyncWrapper } from "../utils/asyncWrapper";

const registerController = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      logger.error(messages.EXISTING_EMAIL);
      return sendError(res, createHttpError(409, messages.EXISTING_EMAIL));
    }

    const hash = await hashPassword(password);

    const myPlaylists: IPlaylist[] = [];

    await userService.create(name, email, hash, "user", myPlaylists);

    return sendResponse(res, messages.ACCOUNT_CREATED, 201);
  } catch (err) {
    const error = err as Error;

    logger.error(error.message);
    return sendError(res, error);
  }
});

export default registerController;