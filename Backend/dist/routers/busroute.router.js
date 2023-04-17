"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const busroutes_controllers_1 = require("../controllers/busroutes.controllers");
router.post("/busroutes/create", busroutes_controllers_1.create)
    .get("/busroutes", busroutes_controllers_1.getAll);
exports.default = router;
