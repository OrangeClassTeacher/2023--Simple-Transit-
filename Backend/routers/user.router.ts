import { Router } from "express"
const router = Router();


import { Login, Signup, getAll } from '../controllers/user.controller'
router.post("/user/signup", Signup)
    .post("/user/login", Login)
    .post("/user/getAll", getAll)

export default router;