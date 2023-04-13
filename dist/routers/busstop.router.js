"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const busstops_controllers_1 = require("../controllers/busstops.controllers");
router.post("/busstops/create", busstops_controllers_1.create)
    .get("/busstops", busstops_controllers_1.getAll);
exports.default = router;
