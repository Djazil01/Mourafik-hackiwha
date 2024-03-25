"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    static info(req, _res, next) {
        let methodColor = null;
        switch (req.method) {
            case "GET":
                methodColor = chalk_1.default.green;
                break;
            case "POST":
                methodColor = chalk_1.default.blue;
                break;
            case "PUT":
                methodColor = chalk_1.default.yellow;
                break;
            case "DELETE":
                methodColor = chalk_1.default.red;
                break;
            default:
                methodColor = chalk_1.default.white;
                break;
        }
        const now = new Date();
        const formattedDate = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours() % 12 || 12}:${now.getMinutes()}:${now.getSeconds()} ${now.getHours() > 12 ? "PM" : "AM"}`;
        console.log(`${methodColor.bold(req.method)} ${chalk_1.default.cyanBright(req.url)} ${chalk_1.default.greenBright.bgBlack(formattedDate)}`);
        next();
    }
    static error(error, _req, _res, next) {
        console.error(error);
        next(error);
    }
}
exports.Logger = Logger;
exports.default = Logger;
