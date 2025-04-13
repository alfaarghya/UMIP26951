import { Request, Response } from "express";
import prisma from "@stba/db/prisma";
import { Status, StatusMessages } from "../statusCode/response";
import { AddTeacherSchema, RemoveTeacherSchema, UpdateTeacherSchema, } from "@stba/types/serverTypes";

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

// Get all teachers
export const getTeachers = async (_req: Request, res: Response) => {
  try {
    //fetch teachers from db
    const teachers = await prisma.user.findMany({
      where: { role: "TEACHER" },
      select: { id: true, name: true, email: true, subject: true, department: true },
    });

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "teachers successfully fetched",
      teachers,
    });
    return;
  } catch (error) {
    console.error("Get teachers error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later",
    });
    return;
  }
};

// Update teacher
export const updateTeacher = async (req: Request, res: Response) => {
  try {
    //validate request data
    const validation = UpdateTeacherSchema.safeParse({ teacherId: req.params, ...req.body });
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get valid data
    const { teacherId, name, subject, department } = validation.data;

    //find the teacher
    const teacher = await prisma.user.findUnique({ where: { id: teacherId } });

    //teacher not found
    if (!teacher || teacher.role !== "TEACHER") {
      res.status(Status.NotFound).json({
        status: Status.NotFound,
        statusMessage: StatusMessages[Status.NotFound],
        message: "Teacher not found",
      });
      return;
    }

    //update teacher data
    await prisma.user.update({
      where: { id: teacherId },
      data: { name, subject, department },
    });

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "successfully update teacher",
    });
    return;
  } catch (error) {
    console.error("Update teacher error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later",
    });
    return;
  }
};

// remove teacher
export const removeTeacher = async (req: Request, res: Response) => {
  try {
    //validate request data
    const validation = RemoveTeacherSchema.safeParse(req.params);
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get the valid data
    const { teacherId } = validation.data;

    //search the teacher in db
    const teacher = await prisma.user.findFirst({
      where: {
        id: teacherId,
        role: "TEACHER",
      },
    });

    // no teacher found
    if (!teacher) {
      res.status(Status.NotFound).json({
        status: Status.NotFound,
        statusMessage: StatusMessages[Status.NotFound],
        message: "Teacher not found",
      });
      return;
    }

    //remove the teacher
    await prisma.user.delete({ where: { id: teacher.id } });
    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Teacher removed successfully",
    });
    return;
  } catch (error) {
    console.error("Delete teacher error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later"
    });
    return;
  }
};
