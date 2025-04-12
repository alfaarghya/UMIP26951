import { Router } from "express";
import { registerStudent, setTeacherPassword } from "../controller/auth.controller";

const router = Router();

//student register
router.post("/student/register", registerStudent);

//teacher set password
router.post('/teacher/password', setTeacherPassword);

export default router;