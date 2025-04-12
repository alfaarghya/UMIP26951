import { Router } from "express";
import { registerStudent } from "../controller/auth.controller";

const router = Router();

//student register
router.post("/student/register", registerStudent);

export default router;