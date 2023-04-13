import { Router } from "express"
const router = Router();


import { Login, Signup } from '../controllers/user.controller'
router.post("/user/signup", Signup)
    .post("/user/login", Login)

export default router;