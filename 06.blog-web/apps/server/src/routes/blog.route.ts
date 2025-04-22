import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../controller/blog.controller";

const router = Router();

//create a blog
router.post("/", authenticate, createBlog);

//read all blog
router.get("/", authenticate, getBlogs);

//read a blog
router.get("/:id", authenticate, getBlog);

//update a blog
router.put("/:id", authenticate, updateBlog);

//delete a blog
router.delete("/:id", authenticate, deleteBlog);


export default router;