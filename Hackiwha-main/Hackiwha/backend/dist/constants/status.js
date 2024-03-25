"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const Status = {
    Welcome: {
        message: "Welcome to the API",
        code: 200,
    },
    UserCreated: {
        message: "User Created",
        code: 201,
    },
    LoginSuccess: {
        message: "Login Success",
        code: 200,
    },
    LogoutSuccess: {
        message: "Logout Success",
        code: 200,
    },
    BadRequest: {
        message: "Bad Request",
        code: 400,
    },
    Unauthorized: {
        message: "Unauthorized",
        code: 401,
    },
    InvalidToken: {
        message: "Invalid Token",
        code: 401,
    },
    InvalidLogin: {
        message: "Invalid Email or Password",
        code: 401,
    },
    NotFound: {
        message: "Not Found",
        code: 404,
    },
    UserAlreadyExist: {
        message: "User Already Exist",
        code: 409,
    },
    TooManyRequests: {
        message: "Too Many Requests",
        code: 429,
    },
    InternalServerError: {
        message: "Internal Server Error",
        code: 500,
    },
};
exports.Status = Status;
