import { Request, Response } from "express";
import { CreateBlogSchema, DeleteBlogSchema, UpdateBlogSchema } from "@blog-web/types/server";
import { Status, StatusMessages } from "../statusCode/response";
import prisma from "@blog-web/db/prisma";

//create blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    //validate request data
    const validation = CreateBlogSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get valid data
    const { userId, title, content } = validation.data

    // create blog
    const newBlog = await prisma.blog.create({
      data: {
        title: title,
        content: content,
        authorId: userId,
      },
    });

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Blog created successfully",
      blog: newBlog
    });
    return;
  } catch (error) {
    console.error("Error in create blog:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later",
    });
    return;
  }
};

//get blogs
export const getBlogs = async (req: Request, res: Response) => {
  try {
    // retrieve blogs
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Blogs retrieve successfully",
      blog: blogs
    });
    return;
  } catch (error) {
    console.error("Error in retrieving blogs:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later",
    });
    return;
  }
};

//get blog by id
export const getBlog = async (req: Request, res: Response) => {
  try {
    // retrieve blogs
    const blog = await prisma.blog.findFirst({
      where: { id: req.params.id },
      select: {
        title: true,
        content: true,
        createdAt: true,
        id: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!blog) {
      res.status(Status.NotFound).json({
        status: Status.NotFound,
        statusMessage: StatusMessages[Status.NotFound],
        message: "Blog not found",
      });
      return;
    }

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Blog retrieve successfully",
      blog
    });
    return;
  } catch (error) {
    console.error("Error in retrieving blog:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later",
    });
    return;
  }
};

//create blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    //validate request data
    const validation = UpdateBlogSchema.safeParse({ id: req.params.id, ...req.body });
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get valid data
    const { id, userId, title, content } = validation.data

    // find the blog using id and authorId
    const findBlog = await prisma.blog.findFirst({
      where: { id: id, authorId: userId },
    });

    // blog not found
    if (!findBlog) {
      res.status(Status.NotFound).json({
        status: Status.NotFound,
        statusMessage: StatusMessages[Status.NotFound],
        message: `Can't found the blog for ${req.body.username}`,
      });
      return;
    }

    // update the blog
    const updateBlog = await prisma.blog.update({
      where: { id: id, authorId: userId },
      data: {
        title: title,
        content: content,
      },
    });

    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Blog update successfully",
      blog: updateBlog
    });
    return;
  } catch (error) {
    console.error("Error in update blog:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later",
    });
    return;
  }
};

//delete blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    //validate request data
    const validation = DeleteBlogSchema.safeParse({ id: req.params.id, ...req.body });
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get valid data
    const { id, userId } = validation.data

    // find the blog using id and authorId
    const findBlog = await prisma.blog.findFirst({
      where: { id: id, authorId: userId },
    });

    // blog not found
    if (!findBlog) {
      res.status(Status.NotFound).json({
        status: Status.NotFound,
        statusMessage: StatusMessages[Status.NotFound],
        message: "Can't found the blog",
      });
      return;
    }

    //delete all comments
    await prisma.comment.deleteMany({
      where: { blogId: id }
    });

    // delete the blog
    await prisma.blog.delete({
      where: { id: id, authorId: userId },
    });


    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "blog deleted successfully",
    });
    return;
  } catch (error) {
    console.error("Error in delete blog:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later",
    });
    return;
  }
};