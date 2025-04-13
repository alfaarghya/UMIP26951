import { Request, Response } from "express";
import prisma from "@stba/db/prisma";
import { Status, StatusMessages } from "../statusCode/response";
import { AddTeacherSchema } from "@stba/types/serverTypes";

// Add teacher
export const addTeacher = async (req: Request, res: Response) => {
  try {
    //validate request data
    const validation = AddTeacherSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get the data
    const { name, email, subject, department } = validation.data;

    //check for existing teacher
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(Status.Conflict).json({
        status: Status.Conflict,
        statusMessage: StatusMessages[Status.Conflict],
        message: "Email already exists",
      });
      return;
    }

    //add new teacher
    await prisma.user.create({
      data: {
        name,
        email,
        subject,
        department,
        role: "TEACHER",
        status: "APPROVED", // teacher doesn't need approval
      },
    });
    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Teacher is successfully added",
    });
    return
  } catch (error) {
    console.error("Add teacher error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later"
    });
    return;
  }
};

