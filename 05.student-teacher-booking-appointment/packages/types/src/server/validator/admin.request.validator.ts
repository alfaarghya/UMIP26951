import z from "zod";

// add teacher validator
export const AddTeacherSchema = z.object({
  name: z.string().nonempty("add teacher's name"),
  email: z.string().email("please a valid email").nonempty("add teacher's email"),
  subject: z.string().nonempty("add teacher's subject"),
  department: z.string().nonempty("add teacher's department"),
});
