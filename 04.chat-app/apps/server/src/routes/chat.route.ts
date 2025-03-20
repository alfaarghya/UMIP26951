import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { getMessages, getUserChats } from "../controller/chatController";


const router = Router();

//get the list of rooms and inboxes
router.get("/lists", authenticate, getUserChats);

//get the message history of a room or inbox
router.get("/:roomOrInboxId", authenticate, getMessages);


export default router;
