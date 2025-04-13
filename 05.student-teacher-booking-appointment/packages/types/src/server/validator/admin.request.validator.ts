import z from "zod";

// add teacher validator
export const AddTeacherSchema = z.object({
  name: z.string().nonempty("add teacher's name"),
  email: z.string().email("please a valid email").nonempty("add teacher's email"),
  subject: z.string().nonempty("add teacher's subject"),
  department: z.string().nonempty("add teacher's department"),
});

//update teacher validator
export const UpdateTeacherSchema = z.object({
  teacherId: z.string().uuid().nonempty("require teacher's ID to update"),
  name: z.string().optional(),
  subject: z.string().optional(),
  department: z.string().optional(),
});

//delete teacher validator
export const RemoveTeacherSchema = z.object({
  teacherId: z.string().uuid().nonempty("require teacher's ID to remove"),
});
