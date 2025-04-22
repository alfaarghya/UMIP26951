import { z } from "zod";

//signup validator
export const SignupSchema = z.object({
  name: z.string().nonempty("name can't be empty"),
  email: z.string().email("Invalid email address").nonempty("email can't be empty"),
  username: z.string().max(25, "username must be 25 or fewer characters long").nonempty("username can't be empty"),
  password: z.string().min(8, "password must be at least 8 characters long").nonempty("password can't be empty"),
});

//signin validator
export const SigninSchema = z.object({
  username: z.string().max(25, "username must be 25 or fewer characters long").nonempty("username can't be empty"),
  password: z.string().min(8, "password must be at least 8 characters long").nonempty("password can't be empty"),
});
