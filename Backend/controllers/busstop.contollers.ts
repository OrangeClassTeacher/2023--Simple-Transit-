import { Request, Response } from "express"
import busstop from "../model/busstops.model";

const create = async (req: Request, res: Response) => {
    try {
        const result = await busstop.create(req.body)
        res.json({ status: true, result })
        return
    } catch (err) {
        res.json({ status: false, message: err })
        return
    }
}

const getAll = async (req: Request, res: Response) => {
    try {
        const result = await busstop.find({})
        res.json({ status: true, result })
        return
    } catch (err) {
        res.json({ status: false, message: err })
        return
    }
}

export { getAll, create };