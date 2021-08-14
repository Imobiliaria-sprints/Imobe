import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "..", "uploads"),
    filename: (
      request: Request,
      file: Express.Multer.File,
      callback: (error: Error, filename: string) => void
    ) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) => {
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/pjpeg",
    ];

    if (!allowedMimes.includes(file.mimetype)) {
      return callback(new Error("Invalid file type"));
    }
    callback(null, true);
  },
};
