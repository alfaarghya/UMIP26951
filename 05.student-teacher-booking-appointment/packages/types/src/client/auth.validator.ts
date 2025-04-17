import z from "zod";
import { StudentRegisterSchema, UserLoginSchema } from "../server";

export type UserLoginType = z.infer<typeof UserLoginSchema>;
export type StudentRegisterType = z.infer<typeof StudentRegisterSchema>;