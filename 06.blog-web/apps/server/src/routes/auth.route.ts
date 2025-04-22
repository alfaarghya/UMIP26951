import { Router } from "express";
import { logout, signin, signup } from "../controller/auth.controller";

const router = Router();

//create a user account
router.post("/signup", signup);

//login to a user account
router.post("/signin", signin);

//user log out
router.post("/logout", logout);

export default router;