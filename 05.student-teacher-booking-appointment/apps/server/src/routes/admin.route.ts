import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { authorizeAdmin } from "../middleware/authorize";
import { addTeacher, getTeachers, updateTeacher } from "../controller/admin.controller";

const router = Router();

//add teacher
router.post("/teacher", [authenticate, authorizeAdmin], addTeacher);

//get teachers
router.get("/teacher", [authenticate, authorizeAdmin], getTeachers);

//update teacher
router.put("/teacher/:teacherId", [authenticate, authorizeAdmin], updateTeacher);

export default router;