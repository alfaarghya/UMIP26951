import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { authorizeTeacher } from "../middleware/authorize";
import { getAppointments, sendMessage, updateAppointmentStatus } from "../controller/teacher.controller";

const router = Router();

// Get appointments for a teacher based on status
router.get("/appointment/:status", [authenticate, authorizeTeacher], getAppointments);

//APPROVED/CANCELLED student appointment request
router.put("/appointment/:id", [authenticate, authorizeTeacher], updateAppointmentStatus);

//Send message by teacher
router.post("/messages/:id", [authenticate, authorizeTeacher], sendMessage);

export default router;