import { Request, Response } from "express";
import { Status, StatusMessages } from "../statusCode/response";
import bcrypt from "bcryptjs";
import prisma from "@stba/db/prisma";
import { StudentRegisterSchema } from "@stba/types/serverTypes";

//registration controller for students
export const registerStudent = async (req: Request, res: Response) => {
  try {
    //validate the request data
    const validation = StudentRegisterSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get data
    const { name, email, password } = validation.data;

    //check for existing student
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing?.status === "PENDING") {
      res.status(Status.Conflict).json({
        status: Status.Conflict,
        statusMessage: StatusMessages[Status.Conflict],
        message: "Please wait 12-24 hours for admin approval.",
      });
      return;
    } else if (existing?.status === "APPROVED") {
      res.status(Status.Conflict).json({
        status: Status.Conflict,
        statusMessage: StatusMessages[Status.Conflict],
        message: "Email is already register",
      });
      return;
    }

    //create new student
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "STUDENT",
        status: "PENDING",
      },
    });

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Registration successful. Please wait 12-24 hours for admin approval.",
      studentId: newStudent.id,
      email: newStudent.email
    });
    return;
  } catch (err) {
    console.error("Student registration error:", err);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later",
    });
    return;
  }
};
