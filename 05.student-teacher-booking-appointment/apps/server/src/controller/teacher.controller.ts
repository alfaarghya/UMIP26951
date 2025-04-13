import { Request, Response } from "express";
import prisma from "@stba/db/prisma";
import { Status, StatusMessages } from "../statusCode/response";
import { AppointmentStatusSchema, GetAppointmentSchema } from "@stba/types/serverTypes";

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
