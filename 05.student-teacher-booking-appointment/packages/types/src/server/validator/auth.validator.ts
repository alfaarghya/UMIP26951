import { z } from "zod";

//registration validator for students
export const StudentRegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

//set password validator for teacher
export const SetPasswordSchema = z.object({
  teacherId: z.string().uuid().nonempty("need teacher id"),
  email: z.string().email("Email is required").nonempty("can't leave email empty"),
  password: z.string().min(8, "Password need at least 8 char long").nonempty("Password is required"),
});

//login validator
export const UserLoginSchema = z.object({
  email: z.string().email("Email is required").nonempty("can't leave email empty"),
  password: z.string().min(8, "Password need at least 8 char long").nonempty("Password is required"),
  role: z.enum(["STUDENT", "TEACHER", "ADMIN"])
});
