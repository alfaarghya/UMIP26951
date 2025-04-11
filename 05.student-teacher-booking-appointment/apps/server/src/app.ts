import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import checkRoutes from "./middleware/checkRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); //parse the cookies
app.use(checkRoutes); // check all routes 


// Default Route
app.get("/", (_req, res) => {
  res.status(200).json({ msg: "Hello from Student-Teacher booking application server" });
});


export default app;
