import { z } from "zod";

//registration validator for students
export const StudentRegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});
