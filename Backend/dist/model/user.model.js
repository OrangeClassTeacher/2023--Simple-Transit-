"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
