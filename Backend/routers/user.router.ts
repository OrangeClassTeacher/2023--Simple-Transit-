import { Router } from "express"
const router = Router();


import { Login, Signup, getAllNotFriends, getAllFriends, getOneFriend } from '../controllers/user.controller'
router.post("/user/signup", Signup)
    .post("/user/login", Login)
    .post("/user/getallnotfriends", getAllNotFriends)
    .post("/user/getallfriends", getAllFriends)
    .post("/user/getone", getOneFriend)

export default router;