import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { authorizeStudent } from "../middleware/authorize";
import { bookAppointment, cancelAppointment, getAppointments, getMessages, searchTeachers } from "../controller/student.controller";

const router = Router();

//search teachers by name/department/subject
router.get("/search", [authenticate, authorizeStudent], searchTeachers);

//book an appointment with teacher
router.post("/appointment", [authenticate, authorizeStudent], bookAppointment);

//get all appointments
router.get("/appointment", [authenticate, authorizeStudent], getAppointments);

//cancel an appointment
router.delete("/appointment/:id", [authenticate, authorizeStudent], cancelAppointment);

//get messages for an appointment
router.get("/messages/:appointmentId", [authenticate, authorizeStudent], getMessages);

export default router;