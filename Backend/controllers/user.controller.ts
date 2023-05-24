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
const addLocationField = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});
        users.forEach(async (user) => {
            user.location = []; // Set an empty array for the location field
            await user.save();

        });
        res.json({ status: true, users })
    } catch (error) {
        res.json({ status: false, message: error })
        return
    }
}

const Signup = async (req: Request, res: Response) => {

    try {
        const { name, email, password, image, location } = req.body
        const newPassword = await bcrypt.hash(password, saltRounds);
        const result = await User.create({ name, email, password: newPassword, image, location });

        res.json({ status: true, message: "success", result })

    }
    catch (err) {
        console.log(err);

        res.json({ status: "false", message: err })
    }


}

const Login = async (req: Request, res: Response) => {
    try {
        console.log(req.body);

        const { email, password, location } = req.body
        let user: any = await User.findOne({ email: email })

        if (email == user.email) {
            const decrypt = await bcrypt.compare(
                password,
                user.password
            );

            if (decrypt) {
                if (location) {
                    user.location = location;
                    await user.save();
                }
                await res.json({ status: true, message: "Logged in", user })
                return
            }
            else {
                res.json({ message: "Wrong email or password" })
                return
            }
        }
    }
    catch (err) {
        res.json({ status: false, message: err })
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
                    { status: "pending" }]
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

const getOneFriend = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body
        const result = await User.find({ _id: userId })
        res.json({ status: true, result })
    } catch (error) {
        res.json({ status: false, message: error })
        return
    }
}

export { Login, Signup, getAllNotFriends, getAllFriends, addLocationField, getOneFriend }