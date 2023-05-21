import { createMessage, getMessages } from "../controllers/messages.controllers";
import { Router } from "express"
const router = Router();

router.post("/messages/getall", createMessage)
    .get("/messages/create", getMessages)

export default router;