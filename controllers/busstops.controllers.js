const busstop = require("../model/bus_stops.model")

exports.create = async (req, res) => {
    try {
        const result = await busstop.create(req.body)
        res.json({ status: true, result })
    } catch (err) {
        res.json({ status: "false", message: err })
    }
}

exports.getAll = async (req, res) => {
    try {
        const result = await busstop.find({})
        res.json({ status: true, result })

    } catch (err) {
        res.json({ status: "false", message: err })
    }
}