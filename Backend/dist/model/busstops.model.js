"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const busStopSchema = new mongoose_1.Schema({
    busStopName: String,
    busStopCoord: [Number]
});
const busstop = (0, mongoose_1.model)("busstop", busStopSchema);
exports.default = busstop;
