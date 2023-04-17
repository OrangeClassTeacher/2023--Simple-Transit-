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

const busRouteSchema = new Schema<IBusroute>({
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


const busroute = model("busroute", busRouteSchema);

export default busroute;