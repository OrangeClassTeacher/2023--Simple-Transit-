const express = require("express");

const router = express.Router();
const busstop = require("../controllers/busstops.controllers");

router.post("/busstops/create", busstop.create)
router.get("/busstops", busstop.getAll)

module.exports = router