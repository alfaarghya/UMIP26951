import { Request, Response } from "express";
import prisma from "@stba/db/prisma";
import { Status, StatusMessages } from "../statusCode/response";
import { SearchTeacherSchema, BookAppointmentSchema } from "@stba/types/serverTypes";

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

