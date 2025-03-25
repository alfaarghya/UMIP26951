import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { createRoom, deleteRoom, getMessages, getRoomDetails, getUserChats, joinRoom, updateRoom } from "../controller/chatController";


const router = Router();

//get the list of rooms and inboxes
router.get("/lists", authenticate, getUserChats);

//get the message history of a room or inbox
router.get("/:roomOrInboxId", authenticate, getMessages);

//create a room
router.post("/room", authenticate, createRoom);

//get the list of people in the room
router.post("/:roomId", authenticate, getRoomDetails);

//join a room
router.put("/join-room", authenticate, joinRoom);

//update room -> rename or kick user
router.put("/:roomId", authenticate, updateRoom);

//delete a room
router.delete("/:roomId", authenticate, deleteRoom);

export default router;
