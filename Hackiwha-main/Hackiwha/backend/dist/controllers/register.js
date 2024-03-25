"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRegister = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../database/models/User");
const status_1 = require("../constants/status");
const hasher_1 = require("../Util/hasher");
const validator_1 = require("../Util/validator");
const process_1 = __importDefault(require("process"));
const uuid_1 = require("uuid");
const handleRegister = async (req, res) => {
    const validStatus = validator_1.Validator.validateUser(req.body);
    if (!validStatus.valid) {
        res.status(status_1.Status.BadRequest.code).json({
            ...status_1.Status.BadRequest,
            error: validStatus.message,
        });
        return;
    }
    const user = req.body;
    const userExist = await User_1.userModel.findOne({ email: user.info.email });
    if (userExist) {
        res.status(status_1.Status.UserAlreadyExist.code).json(status_1.Status.UserAlreadyExist);
        return;
    }
    user._id = (0, uuid_1.v4)();
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, `${process_1.default.env.JWT_SECRET}`, {
        expiresIn: process_1.default.env.JWT_EXPIRES_IN,
    });
    const hash = await hasher_1.Hasher.hashPassword(user.info.password);
    user.info.password = hash;
    const data = new User_1.userModel(user);
    await data.save();
    res.status(status_1.Status.UserCreated.code).json({
        ...status_1.Status.UserCreated,
        token: `Bearer ${token}`,
    });
};
exports.handleRegister = handleRegister;
