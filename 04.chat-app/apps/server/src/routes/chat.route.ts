import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { getUserChats } from "../controller/chatController";


const router = Router();

//get the list of rooms and inboxes
router.get("/lists", authenticate, getUserChats);


export default router;
