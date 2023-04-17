import { Request, Response } from "express"
import busroute from "../model/busroutes.model";

const create = async (req: Request, res: Response) => {
    try {
        const result = await busroute.create(req.body)
        res.json({ status: true, result })
    } catch (err) {
        res.json({ status: "false", message: err })
    }
}

const getAll = async (req: Request, res: Response) => {
    try {
        const result = await busroute.find({})
        res.json({ status: true, result })

    } catch (err) {
        res.json({ status: "false", message: err })
    }
}

export { getAll, create };