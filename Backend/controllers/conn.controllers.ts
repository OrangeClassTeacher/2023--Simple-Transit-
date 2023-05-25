import Conn from "../model/userconnection.model";
import { Request, Response } from "express";

const createFriends = async (req: Request, res: Response) => {
    const { requester, recipient, status } = req.body;

    try {
        if (!requester && !recipient) {
            res.json({ status: false, message: "Id needed" })
            return
        }
        const result = await Conn.create({ requester: requester, recipient: recipient, status: status })
        res.json({ realStatus: true, result })
        return
    } catch (error) {
        res.json({ status: false, message: error })
        return
    }
}
const getAll = async (req: Request, res: Response) => {
    try {
        const result = await Conn.find({})
        res.json({ status: true, result })
        return
    } catch (error) {
        res.json({ status: false, message: error })
        return
    }
}

export { createFriends, getAll };