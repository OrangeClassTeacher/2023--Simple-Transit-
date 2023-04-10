const { default: mongoose } = require("mongoose")

const busstopSchema = mongoose.Schema({
    busstopName: String,
    busstopCoordinates: [Array],
    busstopId: {
        unique: true, type: String
    }
},
)


const busstop = mongoose.model("busstop", busstopSchema);
module.exports = busstop;