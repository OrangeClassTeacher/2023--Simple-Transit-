import { Router } from "express"
const router = Router();


import { getAll, create } from "../controllers/busroutes.controllers"
router.post("/busroutes/create", create)
    .get("/busroutes", getAll)

export default router;