"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouterConfig = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.render("index.html", {
        title: "Home",
    });
});
const mainRouterConfig = {
    router,
    path: "/",
};
exports.mainRouterConfig = mainRouterConfig;
