import { Schema, model, Types } from "mongoose"

const busstopSchema = new Schema({
    busstopName: String,
    busstopCoordinates: [Array],
    busstopId: {
        unique: true, type: String
    }
},
)


const busstop = model("busstop", busstopSchema);

export default busstop;