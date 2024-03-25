"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator_1 = require("../Util/validator");
const User_1 = require("../database/models/User");
const status_1 = require("../constants/status");
const process_1 = __importDefault(require("process"));
class Authenticator {
    static async verify(req, res, next) {
        req.user = null;
        const header = `${req.headers.authorization}`;
        const isValid = validator_1.Validator.validateToken(header);
        if (!isValid) {
            res.status(status_1.Status.InvalidToken.code).json(status_1.Status.InvalidToken);
            return;
        }
        const token = header.split(" ")[1];
        let payload = null;
        try {
            const verify = jsonwebtoken_1.default.verify(token, `${process_1.default.env.JWT_SECRET}`);
            if (typeof verify === "string") {
                throw new Error("Invalid Token");
            }
            payload = verify;
        }
        catch (e) {
            res.status(status_1.Status.InvalidToken.code).json(status_1.Status.InvalidToken);
            return;
        }
        const result = { _id: payload._id };
        //const tokenCreated = new Date((payload.iat || 0) * 1000);
        const user = await User_1.userModel.findById(result._id).select("-info.password");
        if (!user) {
            res.status(status_1.Status.Unauthorized.code).json(status_1.Status.Unauthorized);
            return;
        }
        req.user = user;
        next();
        return;
    }
}
exports.Authenticator = Authenticator;
