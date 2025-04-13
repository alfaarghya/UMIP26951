import { Request, Response } from "express";
import prisma from "@stba/db/prisma";
import { Status, StatusMessages } from "../statusCode/response";
import { SearchTeacherSchema, BookAppointmentSchema, CancelAppointmentSchema, GetMessageSchema } from "@stba/types/serverTypes";

export const searchTeachers = async (req: Request, res: Response) => {
  try {
    //validate request data
    const validation = SearchTeacherSchema.safeParse({ name: req.query.name, department: req.query.department, subject: req.query.subject });
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get the valid data
    const { name, department, subject } = validation.data;

    //find teachers either their name, department, or subject
    const matchTeachers = await prisma.user.findMany({
      where: {
        role: "TEACHER",
        status: "APPROVED",
        ...(name && {
          name: {
            contains: name as string,
            mode: "insensitive",
          },
        }),
        ...(department && {
          department: {
            contains: department as string,
            mode: "insensitive",
          },
        }),
        ...(subject && {
          subject: {
            contains: subject as string,
            mode: "insensitive",
          },
        }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        department: true,
      },
    });

    //check for matched teachers
    if (!matchTeachers) {
      res.status(Status.NoContent).json({
        status: Status.NoContent,
        statusMessage: StatusMessages[Status.NoContent],
        message: "No teacher found",
        teachers: matchTeachers
      });
      return;
    }

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "found teachers",
      teachers: matchTeachers,
    });
    return;

  } catch (error) {
    console.error("getting teacher error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later"
    });
    return;
  }
};

export const bookAppointment = async (req: Request, res: Response) => {
  try {
    //validate request data
    const validation = BookAppointmentSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get the data
    const { studentId, teacherId, date } = validation.data;

    // search teacher in db
    const teacher = await prisma.user.findUnique({
      where: { id: teacherId, role: "TEACHER", status: "APPROVED" },
    });

    //teacher not found
    if (!teacher) {
      res.status(Status.NotFound).json({
        status: Status.NotFound,
        statusMessage: StatusMessages[Status.NotFound],
        message: "Teacher not found",
      });
      return;
    }

    // create appointment
    const appointment = await prisma.appointment.create({
      data: {
        studentId,
        teacherId,
        date,
        status: "PENDING"
      },
    });

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Appointment booked successfully",
      appointment,
    });
    return;

  } catch (error) {
    console.error("appointment booking error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later"
    });
    return;
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    // get student ID from token
    const studentId = req.body.userId;

    // fetch appointments
    const appointments = await prisma.appointment.findMany({
      where: { studentId },
      orderBy: { date: "asc" },
      include: {
        teacher: {
          select: { id: true, name: true, email: true, subject: true, department: true },
        },
      },
    });

    //map data properly
    const response = appointments.map(val => ({
      ...val,
      teacher: val.teacher
    }))

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "successfully retrieve appointments",
      appointments: response,
    });
    return;

  } catch (error) {
    console.error("getting appointments error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later"
    });
    return;
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    //validate request data
    const validation = CancelAppointmentSchema.safeParse({ appointmentId: req.params.id, ...req.body });
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get valid data
    const { appointmentId, studentId } = validation.data;

    // check if appointment exists
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId, studentId },
    });

    if (!appointment) {
      res.status(Status.NotFound).json({
        status: Status.NotFound,
        statusMessage: StatusMessages[Status.NotFound],
        message: "No Appointment found to cancel",
      });
      return;
    }

    // delete appointment
    await prisma.appointment.delete({
      where: { id: appointmentId },
    });

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Appointment cancelled successfully",
    });
    return;

  } catch (error) {
    console.error("cancel appointments error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later"
    });
    return;
  }
};

//get message by teacher 
export const getMessages = async (req: Request, res: Response) => {
  try {
    //validate request data
    const validation = GetMessageSchema.safeParse({ appointmentId: req.params.id, ...req.body });
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get valid data
    const { studentId, appointmentId } = validation.data;

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

    // only the assigned student can access the messages
    if (appointment.studentId !== studentId) {
      res.status(Status.Forbidden).json({
        status: Status.Forbidden,
        statusMessage: StatusMessages[Status.Forbidden],
        message: "Unauthorized access to messages for this appointment",
      });
      return;
    }

    // search db for message for a appointment
    const messages = await prisma.message.findMany({
      where: {
        receiverId: studentId,
        appointmentId: appointmentId
      },
    });

    //no message found
    if (!messages) {
      res.status(Status.NoContent).json({
        status: Status.NoContent,
        statusMessage: StatusMessages[Status.NoContent],
        message: "No Message found",
      });
      return;
    }

    //send success response
    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Messages retrieved successfully",
      content: messages
    });
    return;

  } catch (error) {
    console.error("getting message error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later"
    });
    return;
  }
};
