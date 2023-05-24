import { Router } from "express"
const router = Router();


import { Login, Signup, getAllNotFriends, getAllFriends, addLocationField, getOneFriend } from '../controllers/user.controller'
router.post("/user/signup", Signup)
    .post("/user/login", Login)
    .post("/user/getallnotfriends", getAllNotFriends)
    .post("/user/getallfriends", getAllFriends)
    .get("/user/updatelocation", addLocationField)
    .post("/user/getone", getOneFriend)

export default router;