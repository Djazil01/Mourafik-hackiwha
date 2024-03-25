import { Request, Response, NextFunction } from "express";
import { Status } from "../constants/status";
class Handler {
  public static default(req: Request, _res: Response, next: NextFunction) {
    req.user = null;
    next();
  }

  public static notFound(_req: Request, res: Response, _next: NextFunction) {
    res.status(Status.NotFound.code).json(Status.NotFound);
  }

  public static error(
    _error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    res
      .status(Status.InternalServerError.code)
      .json(Status.InternalServerError);
  }
}

export default Handler;
export { Handler };
