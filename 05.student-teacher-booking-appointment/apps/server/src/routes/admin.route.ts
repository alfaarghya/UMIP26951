import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { authorizeAdmin } from "../middleware/authorize";
import { addTeacher } from "../controller/admin.controller";

const router = Router();

//add teacher
router.post("/teacher", [authenticate, authorizeAdmin], addTeacher);

export default router;