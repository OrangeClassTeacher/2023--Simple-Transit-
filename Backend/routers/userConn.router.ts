import { Router } from "express"
import { createFriends } from '../controllers/conn.controllers'
const router = Router();



router.post("/user/connection", createFriends)

export default router;