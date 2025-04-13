import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { authorizeStudent } from "../middleware/authorize";
import { getTeachers } from "../controller/admin.controller";
import { bookAppointment } from "../controller/student.controller";

const router = Router();

//search teachers by name/department/subject
router.get("/search", [authenticate, authorizeStudent], getTeachers);

//book an appointment with teacher
router.post("/appointment", [authenticate, authorizeStudent], bookAppointment);

export default router;