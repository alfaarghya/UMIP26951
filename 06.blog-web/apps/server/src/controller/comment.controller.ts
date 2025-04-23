import { Request, Response } from "express";
import { CreateCommentSchema, GetCommentsSchema } from "@blog-web/types/server";
import { Status, StatusMessages } from "../statusCode/response";
import prisma from "@blog-web/db/prisma";

// create comment
export const createComment = async (req: Request, res: Response) => {
  try {
    // validate request body
    const validation = CreateCommentSchema.safeParse({ blogId: req.params.blogId, ...req.body });
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    const { userId, blogId, comment } = validation.data;

    // check if blog exists
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      res.status(Status.NotFound).json({
        status: Status.NotFound,
        statusMessage: StatusMessages[Status.NotFound],
        message: "Blog not found",
      });
      return;
    }

    // create comment
    const newComment = await prisma.comment.create({
      data: {
        comment,
        blogId,
        userId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Comment added successfully",
      comment: newComment,
    });
    return;
  } catch (error) {
    console.error("Error in create comment:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later",
    });
    return;
  }
};

// get all comments for a blog
export const getComments = async (req: Request, res: Response) => {
  try {
    const validation = GetCommentsSchema.safeParse(req.params);
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    const { blogId } = validation.data;

    // check if blog exists
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      res.status(Status.NotFound).json({
        status: Status.NotFound,
        statusMessage: StatusMessages[Status.NotFound],
        message: "Blog not found",
      });
      return;
    }

    // fetch comments
    const comments = await prisma.comment.findMany({
      where: { blogId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const response = comments.map(comment => ({
      ...comment,
    }))

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Comments fetched successfully",
      comments: response,
    });
    return;
  } catch (error) {
    console.error("Error in get comments:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later",
    });
    return;
  }
};