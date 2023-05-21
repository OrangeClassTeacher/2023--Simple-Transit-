
import { Schema, model, Types } from "mongoose"

interface IUser {
    name: string;
    email: string;
    password: string;
    image: string;
    location?: number[]
}


const userSchema = new Schema<IUser>(
    {
        name: { type: String, unique: true },
        email: { type: String, unique: true },
        password: String,
        image: String,
        location: { type: [Number], default: [] }
    },

    { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;