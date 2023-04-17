import { Router } from "express"
const router = Router();


import { getAll, create } from "../controllers/busstop.contollers"
router.post("/busstops/create", create)
    .get("/busstops", getAll)

export default router;