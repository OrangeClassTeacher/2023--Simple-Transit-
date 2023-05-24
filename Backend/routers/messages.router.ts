import { createMessage, getMessages } from "../controllers/messages.controllers";
import { Router } from "express"
const router = Router();

router.post("/messages/create", createMessage)
    .post("/messages/getAll", getMessages)

export default router;