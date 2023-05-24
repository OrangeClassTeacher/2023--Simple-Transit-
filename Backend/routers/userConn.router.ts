import { Router } from "express"
import { createFriends, getAll } from '../controllers/conn.controllers'
const router = Router();



router.post("/user/connection", createFriends)
    .get("/user/connection/getall", getAll)
export default router;