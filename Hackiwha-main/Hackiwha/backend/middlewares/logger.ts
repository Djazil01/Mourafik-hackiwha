import chalk from "chalk";
import { NextFunction, Request, Response } from "express";

class Logger {
  public static info(req: Request, _res: Response, next: NextFunction) {
    let methodColor = null;
    switch (req.method) {
      case "GET":
        methodColor = chalk.green;
        break;
      case "POST":
        methodColor = chalk.blue;
        break;
      case "PUT":
        methodColor = chalk.yellow;
        break;
      case "DELETE":
        methodColor = chalk.red;
        break;
      default:
        methodColor = chalk.white;
        break;
    }
    const now = new Date();
    const formattedDate = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} ${
      now.getHours() % 12 || 12
    }:${now.getMinutes()}:${now.getSeconds()} ${
      now.getHours() > 12 ? "PM" : "AM"
    }`;

    console.log(
      `${methodColor.bold(req.method)} ${chalk.cyanBright(
        req.url
      )} ${chalk.greenBright.bgBlack(formattedDate)}`
    );
    next();
  }
  public static error(
    error: Error,
    _req: Request,
    _res: Response,
    next: NextFunction
  ) {
    console.error(error);
    next(error);
  }
}
export default Logger;
export { Logger };
