import { Schema, model, Types } from "mongoose"

interface IBusstop {

    busStopName: string;
    busStopCoord: [number];

}

const busStopSchema = new Schema<IBusstop>({
    busStopName: String,
    busStopCoord: [Number]
}
)


const busstop = model("busstop", busStopSchema);

export default busstop;