import z from "zod";

//teacher search validator
export const SearchTeacherSchema = z.object({
  name: z.string().optional(),
  department: z.string().optional(),
  subject: z.string().optional()
});

//student appointment book validator
export const BookAppointmentSchema = z.object({
  studentId: z.string().uuid("id need to a uuid").nonempty("studentId is required"),
  teacherId: z.string().uuid("id need to a uuid").nonempty("teacherId is required"),
  date: z.string().date("Format: YYYY-MM-DD").nonempty("date is required"),
})

//student appointment cancel validator
export const CancelAppointmentSchema = z.object({
  studentId: z.string().uuid("id need to a uuid").nonempty("studentId is required"),
  appointmentId: z.string().uuid("id need to a uuid").nonempty("appointmentId is required"),
});
