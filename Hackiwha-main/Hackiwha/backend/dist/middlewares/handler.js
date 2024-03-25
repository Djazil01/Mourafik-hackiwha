"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const status_1 = require("../constants/status");
class Handler {
    static default(req, _res, next) {
        req.user = null;
        next();
    }
    static notFound(_req, res, _next) {
        res.status(status_1.Status.NotFound.code).json(status_1.Status.NotFound);
    }
    static error(_error, _req, res, _next) {
        res
            .status(status_1.Status.InternalServerError.code)
            .json(status_1.Status.InternalServerError);
    }
}
exports.Handler = Handler;
exports.default = Handler;
