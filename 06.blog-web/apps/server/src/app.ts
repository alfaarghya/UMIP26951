import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import checkRoutes from "./middleware/checkRoutes";
import authRoutes from "./routes/auth.route";
import blogRoutes from "./routes/blog.route";
import commentRoutes from "./routes/comment.route";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); //parse the cookies
app.use(checkRoutes); // check all routes 

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/comment", commentRoutes);

// Default Route
app.get("/", (_req, res) => {
  res.status(200).json({ msg: "Hello from blog-web server" });
});


export default app;
