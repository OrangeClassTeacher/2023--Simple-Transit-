"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const busstopSchema = new mongoose_1.Schema({
    busstopName: String,
    busstopCoordinates: [Array],
    busstopId: {
        unique: true, type: String
    }
});
const busstop = (0, mongoose_1.model)("busstop", busstopSchema);
exports.default = busstop;
