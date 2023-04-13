"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const busstopSchema = new mongoose_1.Schema({
    busRouteName: String,
    busStopDetails: [
        {
            busStopName: String,
            busStopCoord: [Number]
        }
    ],
    busRouteId: {
        unique: true, type: String
    }
});
const busstop = (0, mongoose_1.model)("busstop", busstopSchema);
exports.default = busstop;
