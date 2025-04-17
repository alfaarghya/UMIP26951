import z from "zod";
import { SetPasswordSchema, StudentRegisterSchema, UserLoginSchema } from "../server";

export type UserLoginType = z.infer<typeof UserLoginSchema>;
export type StudentRegisterType = z.infer<typeof StudentRegisterSchema>;
export type SetPasswordType = z.infer<typeof SetPasswordSchema>;