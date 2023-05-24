import Conn from "../model/userconnection.model";
import { Request, Response } from "express";

const createFriends = async (req: Request, res: Response) => {
    const { requester, recipient, status } = req.body;

    try {
        console.log(requester, recipient);

        if (!requester && !recipient) {
            res.json({ status: false, message: "Id needed" })
            return
        }
        const result = await Conn.create({ requester: requester, recipient: recipient, status: status })
        res.json({ realStatus: true, result })
    } catch (error) {
        res.json({ status: false, message: error })
    }
}
const getAll = async (req: Request, res: Response) => {
    try {
        const result = await Conn.find({})
        res.json({ status: true, result })
    } catch (error) {
        res.json({ status: false, message: error })
        return
    }
}

export { createFriends, getAll };