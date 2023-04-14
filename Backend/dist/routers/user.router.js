"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_controller_1 = require("../controllers/user.controller");
router.post("/user/signup", user_controller_1.Signup)
    .post("/user/login", user_controller_1.Login);
exports.default = router;
