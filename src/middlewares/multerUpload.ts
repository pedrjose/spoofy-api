import multer from "multer";
import createError from "http-errors";
import { handleUpload } from "../helpers/multer";
import { Request, Response, NextFunction } from "express";
import { logger, sendError } from "../helpers";
import { messages } from "../messages";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const UploadMiddleware = upload.single("image");

const multerUploaderConfig = (req: Request, res: Response, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const multerUploader = {
  uploaderMiddleware: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await multerUploaderConfig(req, res, UploadMiddleware);
      
      if (!req.file || !req.file.buffer) {
        return sendError(res, createError(403, messages.ACCESS_DENIED));
      }

      const b64 = Buffer.from(req.file?.buffer).toString("base64");
      let dataURI = "data:" + req.file?.mimetype + ";base64," + b64;

      const imageURL = await handleUpload(dataURI);

      if (!imageURL) {
        return sendError(res, createError(500, messages.UPLOAD_FAILED));
      }

      req.file.path = imageURL;
      
      return next();
    } catch (error) {
      logger.error(error);

      return sendError(res, createError(403, messages.ACCESS_DENIED));
    };
  },
};


