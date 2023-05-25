import { Request, Response } from "express"
import busroute from "../model/busroutes.model";

const create = async (req: Request, res: Response) => {
    try {
        const result = await busroute.create(req.body)
        res.json({ status: true, result })
        return
    } catch (err) {
        res.json({ status: false, message: err })
        return
    }
}

const getAll = async (req: Request, res: Response) => {
    try {
        const result = await busroute.find({})
        res.json({ status: true, result })
        return

    } catch (err) {
        res.json({ status: false, message: err })
        return
    }
}

export { getAll, create };