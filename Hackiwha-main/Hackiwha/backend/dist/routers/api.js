"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouterConfig = void 0;
const express_1 = require("express");
const authenticator_1 = require("../middlewares/authenticator");
const status_1 = require("../constants/status");
const express_rate_limit_1 = require("express-rate-limit");
const login_1 = require("../controllers/login");
const register_1 = require("../controllers/register");
const router = (0, express_1.Router)();
const limiter = (0, express_rate_limit_1.rateLimit)({
    handler: (_req, res) => {
        res.status(status_1.Status.TooManyRequests.code).json(status_1.Status.TooManyRequests);
    },
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: true,
});
router.get("/", limiter, (req, res) => {
    res.status(status_1.Status.Welcome.code).json(status_1.Status.Welcome);
});
router.post("/user/login", login_1.handleLogin);
router.post("/user/register", register_1.handleRegister);
router.get("/user/me", authenticator_1.Authenticator.verify, (req, res) => {
    res.json(req.user);
});
const apiRouterConfig = {
    router,
    path: "/api",
};
exports.apiRouterConfig = apiRouterConfig;
