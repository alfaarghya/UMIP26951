import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import checkRoutes from "./middleware/checkRoutes";
import authRoutes from "./routes/auth.route";
import blogRoutes from "./routes/blog.route";
import commentRoutes from "./routes/comment.route";

const app = express();

// Middleware
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
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
