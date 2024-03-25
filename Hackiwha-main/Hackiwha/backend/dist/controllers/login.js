"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../database/models/User");
const status_1 = require("../constants/status");
const hasher_1 = require("../Util/hasher");
const validator_1 = require("../Util/validator");
const process_1 = __importDefault(require("process"));
const handleLogin = async (req, res) => {
    const validStatus = validator_1.Validator.validateLogin(req.body);
    if (!validStatus.valid) {
        res.status(status_1.Status.BadRequest.code).json({
            ...status_1.Status.BadRequest,
            error: validStatus.message,
        });
        return;
    }
    const loginInfo = req.body;
    const userData = await User_1.userModel.findOne({ email: loginInfo.email });
    const isMatch = userData
        ? await hasher_1.Hasher.comparePassword(loginInfo.password, userData.info.password)
        : false;
    if (!userData || !isMatch) {
        res.status(status_1.Status.InvalidLogin.code).json(status_1.Status.InvalidLogin);
        return;
    }
    const token = jsonwebtoken_1.default.sign({ _id: userData._id }, `${process_1.default.env.JWT_SECRET}`, {
        expiresIn: process_1.default.env.JWT_EXPIRES_IN,
    });
    res.status(status_1.Status.LoginSuccess.code).json({
        ...status_1.Status.LoginSuccess,
        token: `Bearer ${token}`,
    });
};
exports.handleLogin = handleLogin;
