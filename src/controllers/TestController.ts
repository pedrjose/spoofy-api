import { Request, Response } from "express";

import { asyncWrapper } from "./utils/asyncWrapper";
import { sendResponse } from "../helpers";

const TestController = {
  hello: asyncWrapper(async (_req: Request, res: Response) => {
    sendResponse(res, { message: "Hello world" });
  }),
};

export default TestController;