import { Request, Response } from "express";
import { Status, StatusMessages } from "../statusCode/response";
import bcrypt from "bcryptjs";
import prisma from "@stba/db/prisma";
import { SetPasswordSchema, StudentRegisterSchema } from "@stba/types/serverTypes";

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

// set password controller for teacher
export const setTeacherPassword = async (req: Request, res: Response) => {
  try {
    // Validate request data
    const validation = SetPasswordSchema.safeParse({ teacherID: req.params, ...req.body });
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get the data
    const { email, password, teacherId } = validation.data;

    //find the teacher in db
    const teacher = await prisma.user.findUnique({ where: { id: teacherId } });
    // check teacher
    if (!teacher || teacher.email !== email || teacher.role !== "TEACHER") {
      res.status(Status.Forbidden).json({
        status: Status.Forbidden,
        statusMessage: StatusMessages[Status.Forbidden],
        message: "Access denied",
      });
      return;
    }

    //check if password is already put
    if (teacher.password) {
      res.status(Status.Conflict).json({
        status: Status.Conflict,
        statusMessage: StatusMessages[Status.Conflict],
        message: "Password already set. Please login instead.",
      });
      return
    }

    //set the password
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: teacherId, email },
      data: { password: hashedPassword },
    });

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Password set successfully! Now Go to login page to login",
    });
    return;
  } catch (err) {
    console.error("Set password error:", err);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error please try again later",
    });
    return;
  }
};
