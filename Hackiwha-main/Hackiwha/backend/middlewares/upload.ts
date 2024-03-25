import { Request, Response } from "express";

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/");
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter(req, file, callback) {
    const test = /pdf/gi.test(file.mimetype);
    if (test) {
      return callback(new Error("Please upload an image"));
    }
    callback(null, true);
  },
});




export const uploadMiddleware = upload.single("file");
