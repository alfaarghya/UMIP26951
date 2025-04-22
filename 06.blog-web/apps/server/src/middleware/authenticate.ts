import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Status, StatusMessages } from "../statusCode/response";

// Auth middleware to verify jwt token
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get JWT token from cookies
    const token = req.cookies?.token;

    //check if token is provided
    if (!token) {
      res.status(Status.Unauthorized).json({
        status: Status.Unauthorized,
        statusMessage: StatusMessages[Status.Unauthorized],
        message: "Authentication required. Please log in.",
      });
      return;
    }

    //verify the token
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    if (!decoded || !decoded.id || !decoded.email || !decoded.username) {
      res.status(Status.Unauthorized).json({
        status: Status.Unauthorized,
        statusMessage: StatusMessages[Status.Unauthorized],
        message: "Invalid token. Please log in again.",
      });
      return;
    }

    // Attach user info to request
    req.body = {
      userId: decoded.id,
      username: decoded.username,
      email: decoded.email,
      ...req.body, // Keep existing request body
    };

    next(); // Go to next middleware or controller
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Authentication error. Please try again later.",
    });
    return;
  }
};

export default authenticate;
