import z from "zod";

// add teacher validator
export const AddTeacherSchema = z.object({
  teacherName: z.string().nonempty("add teacher's name"),
  teacherEmail: z.string().email("please a valid email").nonempty("add teacher's email"),
  subject: z.string().nonempty("add teacher's subject"),
  department: z.string().nonempty("add teacher's department"),
});

//update teacher validator
export const UpdateTeacherSchema = z.object({
  teacherId: z.string().uuid().nonempty("require teacher's ID to update"),
  teacherName: z.string().optional(),
  subject: z.string().optional(),
  department: z.string().optional(),
});

//delete teacher validator
export const RemoveTeacherSchema = z.object({
  teacherId: z.string().uuid().nonempty("require teacher's ID to remove"),
});

//student approval schema
export const StudentApprovalSchema = z.object({
  studentId: z.string().uuid().nonempty("required student Id to approve"),
  action: z.enum(["PENDING", "APPROVED", "DENIED"]),
});

export const StudentStatusCheck = z.object({
  status: z.enum(["PENDING", "APPROVED", "DENIED"]),
})