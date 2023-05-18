import User from "../model/user.model"
import * as bcrypt from "bcrypt"
import { Request, Response } from "express"
import mongoose from "mongoose";
import Conn from "../model/userconnection.model";


const saltRounds = 10;
interface IUser {
    name: string;
    email: string;
    password: string;
}


const Signup = async (req: Request, res: Response) => {

    try {
        const { name, email, password } = req.body
        const newPassword = await bcrypt.hash(password, saltRounds);
        const result = await User.create({ name, email, password: newPassword });

        res.json({ message: "success", result })

    }
    catch (err) {
        console.log(err);

        res.json({ status: "false", message: err })
    }


}

const Login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body
        let user: any = await User.findOne({ email: email })

        if (email == user.email) {
            const decrypt = await bcrypt.compare(
                password,
                user.password
            );

            if (decrypt) {
                res.json({ status: true, message: "Logged in", user })

            }
            else {
                res.json({ message: "Wrong email or password" })

            }
        }
    }
    catch (err) {
        res.json({ status: "false", message: err })
    }
}

const getAllNotFriends = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const { userId } = req.body
        const result = await Conn.aggregate([{
            $match:
            {
                $and:
                    [{
                        $or: [
                            { requester: new mongoose.Types.ObjectId(userId?.toString()) },
                            { recipient: new mongoose.Types.ObjectId(userId?.toString()) }
                        ]
                    },
                    { status: "accepted" }]
            }
        },
        { $group: { _id: "$recipient" } }])
        const ress = await User.find({ $and: [{ _id: { $nin: result } }, { _id: { $nin: userId } }, { name: { $regex: name, $options: "i" } }] })


        if (!result) {
            res.json({ status: false, message: 'blhgu bn' })
            return
        }
        res.json({ status: true, result, ress })
        return
    }
    catch (err) {
        res.json({ status: false, message: err });
        return
    }


}

const getAllFriends = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body
        console.log(userId);

        const result = await Conn.aggregate([{ $match: { requester: new mongoose.Types.ObjectId(userId?.toString()) } }, { $group: { _id: "$recipient" } }])
        const ress = await User.find({ $and: [{ _id: { $in: result } }, { _id: { $nin: userId } }] })
        res.json({ status: true, ress })
    } catch (error) {
        res.json({ status: false, message: error })
    }
}

export { Login, Signup, getAllNotFriends, getAllFriends }