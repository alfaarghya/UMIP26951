import express from "express";
import { searchUser } from "../controller/searchController";
import authenticate from "../middleware/authenticate";

const router = express.Router();

//search for the user
router.get("/user", authenticate, searchUser);

export default router;
