import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { Validator } from "../Util/validator";
import { UserModel } from "../database/models/User";

import { Status } from "../constants/status";

import process from "process";

class Authenticator {
  static async verify(req: Request, res: Response, next: NextFunction) {
    req.user = null;
    const header = `${req.headers.authorization}`;
    const isValid = Validator.validateToken(header);
    if (!isValid) {
      res.status(Status.InvalidToken.code).json(Status.InvalidToken);
      return;
    }

    const token = header.split(" ")[1];
    let payload: JwtPayload | null = null;
    try {
      const verify = jwt.verify(token, `${process.env.JWT_SECRET}`);

      if (typeof verify === "string") {
        throw new Error("Invalid Token");
      }

      payload = verify as JwtPayload;
    } catch (e) {
      res.status(Status.InvalidToken.code).json(Status.InvalidToken);
      return;
    }

    const result = { _id: payload._id };
    //const tokenCreated = new Date((payload.iat || 0) * 1000);
    const user = await UserModel.findById(result._id);//.select("-info.password");
    if (!user) {
      res.status(Status.Unauthorized.code).json(Status.Unauthorized);
      return;
    }


    req.user = user;

    next();
    return;
  }
}

export { Authenticator };
