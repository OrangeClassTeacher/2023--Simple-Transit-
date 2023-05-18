import { Schema, Types, model } from "mongoose";

interface IConn {
    requester: { type: Types.ObjectId };
    recipient: { type: Types.ObjectId };
    status: string
}

const connSchema = new Schema<IConn>({
    requester: { type: Schema.Types.ObjectId, ref: "User" },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["add friends", "pending", "accepted", "rejected"] },
}, {
    collection: "conns"
})

const Conn = model<IConn>("Conn", connSchema)

export default Conn;