import Conn from "../model/userconnection.model";
import { Request, Response } from "express";

const createFriends = async (req: Request, res: Response) => {
    const { id1, id2, status } = req.body;
    try {

        const result = await Conn.create({ id1, id2, status })
        res.json({ status: true, result })
    } catch (error) {
        res.json({ status: false, message: error })
    }
}

export { createFriends };