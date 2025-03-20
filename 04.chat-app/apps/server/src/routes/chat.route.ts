import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { createRoom, getMessages, getUserChats, joinRoom } from "../controller/chatController";


const router = Router();

//get the list of rooms and inboxes
router.get("/lists", authenticate, getUserChats);

//get the message history of a room or inbox
router.get("/:roomOrInboxId", authenticate, getMessages);

//create a room
router.post("/room", authenticate, createRoom);

//join a room
router.put("/join-room", authenticate, joinRoom);

export default router;
