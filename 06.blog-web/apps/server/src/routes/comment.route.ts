import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { createComment, getComments } from "../controller/comment.controller";

const router = Router();

//create comment
router.post("/:blogId", authenticate, createComment);

//get all comments for blogId
router.get("/:blogId", authenticate, getComments)

export default router;