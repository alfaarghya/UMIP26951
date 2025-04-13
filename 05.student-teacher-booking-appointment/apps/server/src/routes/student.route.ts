import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { authorizeStudent } from "../middleware/authorize";
import { getTeachers } from "../controller/admin.controller";

const router = Router();

//search teachers by name/department/subject
router.get("/search", [authenticate, authorizeStudent], getTeachers);

export default router;