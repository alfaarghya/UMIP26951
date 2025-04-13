import z from "zod";

//teacher search validator
export const SearchTeacherSchema = z.object({
  name: z.string().optional(),
  department: z.string().optional(),
  subject: z.string().optional()
});
