import z from "zod";

//get appointment validator
export const GetAppointmentSchema = z.object({
  teacherId: z.string().uuid("id need to a uuid").nonempty("teacherId is required"),
  status: z.enum(["PENDING", "APPROVED", "CANCELLED"]),
});


