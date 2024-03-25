import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../database/models/User";
import { Status } from "../constants/status";
import { Hasher } from "../Util/hasher";
import { Validator } from "../Util/validator";
import process from "process";

export const handleLogin = async (req: Request, res: Response) => {
  console.log(req.body);
  const validStatus = Validator.validateLogin(req.body);
  if (!validStatus.valid) {
    res.status(Status.BadRequest.code).json({
      ...Status.BadRequest,
      error: validStatus.error,
    });

    return;
  }

  const loginInfo = req.body as { email: string; password: string };

  const userData = await UserModel.findOne({ "info.email": loginInfo.email });

  const isMatch = userData
    ? await Hasher.comparePassword(loginInfo.password, userData.info.password)
    : false;

  if (!userData || !isMatch) {
    res.status(Status.InvalidLogin.code).json(Status.InvalidLogin);
    return;
  }

  const token = jwt.sign({ _id: userData._id }, `${process.env.JWT_SECRET}`, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(Status.LoginSuccess.code).json({
    ...Status.LoginSuccess,
    token: `Bearer ${token}`,
  });
};
