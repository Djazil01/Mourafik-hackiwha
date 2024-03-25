"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const ejs_1 = require("ejs");
const express_1 = __importDefault(require("express"));
const process_1 = __importDefault(require("process"));
const main_1 = require("./database/main");
const handler_1 = require("./middlewares/handler");
const logger_1 = require("./middlewares/logger");
const api_1 = require("./routers/api");
const main_2 = require("./routers/main");
/*import https from "https";
import fs from "fs";*/
(0, dotenv_1.config)({
    path: ".env",
});
(0, main_1.initDB)(`${process_1.default.env.MONGO_URI}`);
const app = (0, express_1.default)();
//const httpServer = http.createServer(app);
/*const httpsServer = https.createServer(
  {
    key: fs.readFileSync("./certs/key.pem"),
    cert: fs.readFileSync("./certs/cert.pem"),
  },
  app
);*/
app.set("views", "views");
app.set("view engine", "ejs");
app.engine("html", ejs_1.renderFile);
app.use((0, cors_1.default)()); // Enable All CORS Requests
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express_1.default.json({})); // for parsing application/json
app.use(handler_1.Handler.default);
app.use(logger_1.Logger.info); // Log all requests
app.use("/static", express_1.default.static("static")); // Serve static files
app.use(main_2.mainRouterConfig.path, main_2.mainRouterConfig.router); // Main router
app.use(api_1.apiRouterConfig.path, api_1.apiRouterConfig.router); // API router
app.use(handler_1.Handler.notFound); // 404 handler
app.use(logger_1.Logger.error); // Log all errors
app.use(handler_1.Handler.error); // Error handler
/*
httpServer.listen(process.env.PORT, () => {
  console.log(
    `HTTP Server started on port http://localhost:${process.env.PORT}`
  );
});
*/
app.listen(process_1.default.env.PORT, () => {
    console.log(`HTTP Server started on port http://localhost:${process_1.default.env.PORT}`);
});
/*
httpsServer.listen(5000, () => {
  console.log(`HTTPS Server started on port ${5000}`);
});*/
