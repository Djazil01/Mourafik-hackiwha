"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
//create a new schema for user
const userSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.String, required: true },
    info: {
        email: { type: mongoose_1.Schema.Types.String, required: true },
        displayName: { type: mongoose_1.Schema.Types.String, required: true },
        type: {
            type: mongoose_1.Schema.Types.String,
            enum: ["Patient", "Doctor", "Admin"],
            required: true,
        },
        password: { type: mongoose_1.Schema.Types.String, required: true },
    },
}, {
    timestamps: true,
    _id: false,
    versionKey: false,
});
userSchema.index({ email: 1 }, { unique: true });
//create a new model for user
const userModel = (0, mongoose_1.model)("Users", userSchema);
exports.userModel = userModel;
