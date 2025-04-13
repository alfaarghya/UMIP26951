import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { authorizeTeacher } from "../middleware/authorize";
import { getAppointments, updateAppointmentStatus } from "../controller/teacher.controller";

const router = Router();

// Get appointments for a teacher based on status
router.get("/appointment/:status", [authenticate, authorizeTeacher], getAppointments);

//APPROVED/CANCELLED student appointment request
router.put("/appointment/:id", [authenticate, authorizeTeacher], updateAppointmentStatus);

export default router;