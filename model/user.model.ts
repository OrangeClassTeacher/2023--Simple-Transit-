
import { Schema, model, Types } from "mongoose"

interface IUser {
    name: string;
    email: string;
    password: string;
}


const userSchema = new Schema<IUser>(
    {
        name: String,
        email: { type: String, unique: true },
        password: String
    },

    { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;