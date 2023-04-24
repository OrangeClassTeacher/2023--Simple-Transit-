"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const busstop_contollers_1 = require("../controllers/busstop.contollers");
router.post("/busstops/create", busstop_contollers_1.create)
    .get("/busstops", busstop_contollers_1.getAll);
exports.default = router;
