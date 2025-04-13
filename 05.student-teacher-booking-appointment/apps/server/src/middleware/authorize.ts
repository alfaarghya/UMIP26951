import { Request, Response, NextFunction } from "express";
import { Status, StatusMessages } from "../statusCode/response";

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    //get the role form body
    const { role } = req.body;

    //only admin allowed
    if (role !== "ADMIN") {
      res.status(Status.Forbidden).json({
        status: Status.Forbidden,
        statusMessage: StatusMessages[Status.Forbidden],
        message: "Access denied. Admins only.",
      });
      return;
    }

    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error Please try again later.",
    });
    return;
  }
};

