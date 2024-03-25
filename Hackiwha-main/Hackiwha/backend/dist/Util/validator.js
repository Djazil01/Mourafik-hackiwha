"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
class Validator {
    static validateUser(body) {
        const example = {
            username: "username",
            email: "email",
            password: "password",
        };
        const check = this.checkFields(body, example);
        if (!check.valid) {
            return check;
        }
        if (!this.validateEmail(body.email)) {
            return {
                valid: false,
                message: "Invalid Email",
            };
        }
        if (!this.validatePassword(body.password)) {
            return {
                valid: false,
                message: "Invalid Password",
            };
        }
        if (!this.validateUsername(body.username)) {
            return {
                valid: false,
                message: "Invalid Username",
            };
        }
        return {
            valid: true,
            message: "Valid User",
        };
    }
    static validateLogin(body) {
        const example = {
            email: "email",
            password: "password",
        };
        const check = this.checkFields(body, example);
        if (!check.valid) {
            return check;
        }
        if (!this.validateEmail(body.email)) {
            return {
                valid: false,
                message: "Invalid Email",
            };
        }
        if (!this.validatePassword(body.password)) {
            return {
                valid: false,
                message: "Invalid Password",
            };
        }
        return {
            valid: true,
            message: "Valid Login",
        };
    }
    static validateEmail(email) {
        const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        return regex.test(email);
    }
    static validateUsername(username) {
        const regex = /^[A-Za-z0-9-_]{3,16}$/;
        return regex.test(username);
    }
    static validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    }
    static validateToken(token) {
        const regex = /^Bearer [A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/;
        return regex.test(token);
    }
    static checkFields(body, example) {
        const exampleKeys = Object.keys(example);
        const bodyKeys = Object.keys(body);
        const checkEqual = exampleKeys.every((key) => bodyKeys.includes(key));
        const checkType = exampleKeys.every((key) => typeof body[key] === typeof example[key]);
        let message = "";
        if (!checkEqual) {
            const messingFields = exampleKeys.filter((key) => !bodyKeys.includes(key));
            const extraFields = bodyKeys.filter((key) => !exampleKeys.includes(key));
            message = `Missing fields (${messingFields.join(",")})\n`;
            message += `Extra fields (${extraFields.join(",")})\n`;
        }
        if (!checkType) {
            const wrongType = exampleKeys.filter((key) => typeof body[key] !== typeof example[key]);
            message += `Invalid type for ${wrongType.join(",")}\n`;
        }
        return {
            valid: checkEqual && checkType,
            message,
        };
    }
}
exports.Validator = Validator;
