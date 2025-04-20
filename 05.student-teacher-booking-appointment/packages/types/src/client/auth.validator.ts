import z from "zod";
import { AddTeacherSchema, SetPasswordSchema, StudentRegisterSchema, UpdateTeacherSchema, UserLoginSchema } from "../server";

export type UserLoginType = z.infer<typeof UserLoginSchema>;
export type StudentRegisterType = z.infer<typeof StudentRegisterSchema>;
export type SetPasswordType = z.infer<typeof SetPasswordSchema>;
export type AddTeacherType = z.infer<typeof AddTeacherSchema>;
export type UpdateTeacherType = z.infer<typeof UpdateTeacherSchema>;