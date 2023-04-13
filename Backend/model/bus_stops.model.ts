import { Schema, model, Types } from "mongoose"

interface IBusroute {
    busRouteName: string;
    busStopDetails: [
        {
            busStopName: string;
            busStopCoord: [number];
        }
    ];
    busRouteId: string;
}

const busstopSchema = new Schema<IBusroute>({
    busRouteName: String,
    busStopDetails: [
        {
            busStopName: String,
            busStopCoord: [Number]
        }],
    busRouteId: {
        unique: true, type: String
    }
},
)


const busstop = model("busstop", busstopSchema);

export default busstop;