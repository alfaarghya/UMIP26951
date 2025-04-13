import { Request, Response } from "express";
import prisma from "@stba/db/prisma";
import { Status, StatusMessages } from "../statusCode/response";
import { AppointmentStatusSchema, GetAppointmentSchema, RetrieveMessageSchema, SendMessageSchema } from "@stba/types/serverTypes";

// Get appointments for a teacher based on status
export const getAppointments = async (req: Request, res: Response) => {
  try {
    //validate request data
    const validation = GetAppointmentSchema.safeParse({ status: req.params.status, ...req.body });
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get valid data
    const { teacherId, status } = validation.data;

    // fetch approved appointments
    const appointments = await prisma.appointment.findMany({
      where: {
        teacherId,
        status,
      },
      orderBy: { date: "asc" },
      include: {
        student: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    //no appointment found
    if (!appointments) {
      res.status(Status.NotFound).json({
        status: Status.Success,
        statusMessage: StatusMessages[Status.Success],
        message: `No appointments found`,
        appointments,
      })
    }

    // map data properly
    const response = appointments.map(val => ({
      ...val,
      student: val.student,
    }));

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: `Successfully retrieved ${status} appointments`,
      appointments: response,
    });
    return;

  } catch (error) {
    console.error("getting approved appointments error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later"
    });
    return;
  }
};

//APPROVED/CANCELLED student appointment request
export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    // validate request data
    const validation = AppointmentStatusSchema.safeParse({ appointmentId: req.params.id, ...req.body });
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    // get valid data
    const { appointmentId, action } = validation.data;

    // find the appointment
    const appointment = await prisma.appointment.findUnique({ where: { id: appointmentId } });

    // not found
    if (!appointment) {
      res.status(Status.NotFound).json({
        status: Status.NotFound,
        statusMessage: StatusMessages[Status.NotFound],
        message: "Appointment not found",
      });
      return;
    }

    //appointment is already APPROVED
    if (appointment.status === "APPROVED") {
      res.status(Status.Conflict).json({
        status: Status.Conflict,
        statusMessage: StatusMessages[Status.Conflict],
        message: `Appointment is already approved`,
      })
      return;
    }

    //appointment is already CANCELLED
    if (appointment.status === "CANCELLED") {
      res.status(Status.Conflict).json({
        status: Status.Conflict,
        statusMessage: StatusMessages[Status.Conflict],
        message: `Appointment is already cancelled`,
      })
      return;
    }


    // update the appointment status
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: action === "APPROVED" ? "APPROVED" : "CANCELLED",
      },
    });

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: `Appointment ${action} successfully`,
    });
    return;

  } catch (error) {
    console.error("Appointment status update error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later",
    });
    return;
  }
};

//Send message by teacher
export const sendMessage = async (req: Request, res: Response) => {
  try {
    // validate request data
    const validation = SendMessageSchema.safeParse({ appointmentId: req.params.id, ...req.body });
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    // get valid data
    const { appointmentId, teacherId, studentId, content } = validation.data;

    // check if appointment exists
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      res.status(Status.NotFound).json({
        status: Status.NotFound,
        statusMessage: StatusMessages[Status.NotFound],
        message: "Appointment not found",
      });
      return;
    }

    // only teacher assigned to the appointment can message
    if (appointment.teacherId !== teacherId) {
      res.status(Status.Forbidden).json({
        status: Status.Forbidden,
        statusMessage: StatusMessages[Status.Forbidden],
        message: "Unauthorized access to send message for this appointment",
      });
      return;
    }

    // store message in db
    await prisma.message.create({
      data: {
        content,
        appointmentId,
        senderId: teacherId,
        receiverId: studentId,
      },
    });

    // send success response
    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Message sent successfully",
    });
    return;

  } catch (error) {
    console.error("sending message error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later"
    });
    return;
  }
};

//retrieve message by teacher
export const getMessages = async (req: Request, res: Response) => {
  try {
    // validate request data
    const validation = RetrieveMessageSchema.safeParse({ appointmentId: req.params.id, ...req.body });
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    // get valid data
    const { teacherId, appointmentId } = validation.data;

    // find the appointment
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    // if appointment doesn't exist
    if (!appointment) {
      res.status(Status.NotFound).json({
        status: Status.NotFound,
        statusMessage: StatusMessages[Status.NotFound],
        message: "Appointment not found",
      });
      return;
    }

    // only the assigned teacher can access the messages
    if (appointment.teacherId !== teacherId) {
      res.status(Status.Forbidden).json({
        status: Status.Forbidden,
        statusMessage: StatusMessages[Status.Forbidden],
        message: "Unauthorized access to this appointment",
      });
      return;
    }

    // fetch messages where sender is the teacher for this appointment
    const messages = await prisma.message.findMany({
      where: {
        senderId: teacherId,
        appointmentId: appointmentId,
      },
      orderBy: {
        createdAt: "asc"
      }
    });

    // no messages
    if (!messages.length) {
      res.status(Status.NoContent).json({
        status: Status.NoContent,
        statusMessage: StatusMessages[Status.NoContent],
        message: "No messages found",
      });
      return;
    }

    // success
    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Messages retrieved successfully",
      content: messages,
    });
    return;

  } catch (error) {
    console.error("get teacher messages error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later"
    });
    return;
  }
};
