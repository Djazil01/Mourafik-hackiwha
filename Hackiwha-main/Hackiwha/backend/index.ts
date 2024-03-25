import cors from "cors";
import { config } from "dotenv";
import { renderFile } from "ejs";
import express from "express";
import process from "process";
import { initDB } from "./database/main";
import { Handler } from "./middlewares/handler";
import { Logger } from "./middlewares/logger";
import { apiRouterConfig } from "./routers/api";
import { mainRouterConfig } from "./routers/main";
import http from "http";
/*import https from "https";
import fs from "fs";*/

config({
  path: ".env",
});

initDB(`${process.env.MONGO_URI}`);

const app = express();
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
app.engine("html", renderFile);

app.use(cors()); // Enable All CORS Requests

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.json({})); // for parsing application/json
app.use(Handler.default);
app.use(Logger.info); // Log all requests

app.use("/static", express.static("static")); // Serve static files

app.use(mainRouterConfig.path, mainRouterConfig.router); // Main router

app.use(apiRouterConfig.path, apiRouterConfig.router); // API router

app.use(Handler.notFound); // 404 handler

app.use(Logger.error); // Log all errors

app.use(Handler.error); // Error handler
/*
httpServer.listen(process.env.PORT, () => {
  console.log(
    `HTTP Server started on port http://localhost:${process.env.PORT}`
  );
});
*/

app.listen(process.env.PORT, () => {
  console.log(
    `HTTP Server started on port http://localhost:${process.env.PORT}`
  );
});
/*
httpsServer.listen(5000, () => {
  console.log(`HTTPS Server started on port ${5000}`);
});*/
