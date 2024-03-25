"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function initDB(uri) {
    const connection = mongoose_1.default.connection;
    connection.on("connected", () => console.log("Connected to DB"));
    connection.on("error", (err) => console.log(`Error connecting to DB: ${err}`));
    connection.on("disconnected", () => console.log("Disconnected from DB"));
    connection.on("reconnected", () => console.log("Reconnected to DB"));
    await mongoose_1.default.connect(uri, {
        appName: "Hackiwha",
        dbName: "nameless-db",
        connectTimeoutMS: 2000, // for testing purposes
    });
    return true;
}
exports.initDB = initDB;
