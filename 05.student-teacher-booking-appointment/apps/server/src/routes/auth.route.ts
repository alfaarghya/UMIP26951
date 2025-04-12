import { Router } from "express";
import { login, logout, registerStudent, setTeacherPassword } from "../controller/auth.controller";

const router = Router();

//student register
router.post("/student/register", registerStudent);

//teacher set password
router.post('/teacher/password', setTeacherPassword);

//user login
router.post("/login", login);

//user log out
router.post("/logout", logout);

export default router;