import z from "zod";

//get appointment validator
export const GetAppointmentSchema = z.object({
  teacherId: z.string().uuid("id need to a uuid").nonempty("teacherId is required"),
  status: z.enum(["PENDING", "APPROVED", "CANCELLED"]),
});

//update appointment status validator
export const AppointmentStatusSchema = z.object({
  appointmentId: z.string().uuid("invalid appointment ID").nonempty("appointment ID is required"),
  teacherId: z.string().uuid("invalid Teacher ID").nonempty("teacher ID is required"),
  action: z.enum(["APPROVED", "CANCELLED"]),
});

//send message validator
export const SendMessageSchema = z.object({
  appointmentId: z.string().uuid("appointmentId must be a valid UUID").nonempty("appointmentId is required"),
  teacherId: z.string().uuid("teacherId must be a valid UUID").nonempty("teacherId is required"),
  studentId: z.string().uuid("studentId must be a valid UUID").nonempty("studentId is required"),
  content: z.string().nonempty("message content is required"),
});

//retrieve message validator
export const RetrieveMessageSchema = z.object({
  teacherId: z.string().uuid("teacherId must be a valid UUID").nonempty("teacherId is required"),
  appointmentId: z.string().uuid("appointmentId must be a valid UUID").nonempty("appointmentId is required"),
});
