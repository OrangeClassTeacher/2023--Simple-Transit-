"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const busRouteSchema = new mongoose_1.Schema({
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
const busroute = (0, mongoose_1.model)("busroute", busRouteSchema);
exports.default = busroute;
