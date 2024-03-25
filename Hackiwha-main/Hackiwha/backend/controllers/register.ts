import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../database/models/User";
import { Status } from "../constants/status";
import { Hasher } from "../Util/hasher";
import { Validator } from "../Util/validator";
import process from "process";
import type { User, UserInfo } from "../types/user";
import { v4 } from "uuid";

export const handleRegister = async (req: Request, res: Response) => {
  const validStatus = Validator.validateRegister(req.body);
  if (!validStatus.valid) {
    res.status(Status.BadRequest.code).json({
      ...Status.BadRequest,
      error: validStatus.error,
    });
    return;
  }
  const user = req.body as {
    _id: string;
    info: UserInfo;
    role: { type: User["role"]["type"] };
  };
  const userExist = await UserModel.findOne({ "info.email": user.info.email });

  if (userExist) {
    res.status(Status.UserAlreadyExist.code).json(Status.UserAlreadyExist);

    return;
  }
  user._id = v4();

  const token = jwt.sign({ _id: user._id }, `${process.env.JWT_SECRET}`, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const hash = await Hasher.hashPassword(user.info.password);
  user.info.password = hash;

  const data = new UserModel(user);

  await data.save();

  res.status(Status.UserCreated.code).json({
    ...Status.UserCreated,
    token: `Bearer ${token}`,
  });
};
