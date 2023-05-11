import User from "../model/user.model"
import * as bcrypt from "bcrypt"
import { Request, Response } from "express"
import { Interface } from "readline"

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

export { Login, Signup }