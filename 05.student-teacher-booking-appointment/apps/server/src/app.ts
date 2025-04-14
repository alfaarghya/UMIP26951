import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import checkRoutes from "./middleware/checkRoutes";
import authRoutes from "./routes/auth.route";
import adminRoutes from "./routes/admin.route";
import studentRoutes from "./routes/student.route";
import teacherRoutes from "./routes/teacher.route";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); //parse the cookies
app.use(checkRoutes); // check all routes 

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);

// Default Route
app.get("/", (_req, res) => {
  res.status(200).json({ msg: "Hello from Student-Teacher booking application server" });
});


export default app;
