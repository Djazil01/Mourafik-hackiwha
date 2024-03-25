"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hasher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class Hasher {
    static async hashPassword(password) {
        const saltRounds = 10;
        const salt = await bcrypt_1.default.genSalt(saltRounds);
        return bcrypt_1.default.hash(password, salt);
    }
    static comparePassword(password, hash) {
        return bcrypt_1.default.compare(password, hash);
    }
}
exports.Hasher = Hasher;
