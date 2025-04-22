import { z } from "zod";

//create blog validator
export const CreateBlogSchema = z.object({
  userId: z.string().uuid("uuid required").nonempty("userId can't be empty"),
  title: z.string().nonempty("Title can't be empty"),
  content: z.string().nonempty("content can't be empty"),
});

//update a blog validator
export const UpdateBlogSchema = z.object({
  id: z.string().uuid("uuid required").nonempty("id can't be empty"),
  userId: z.string().uuid("uuid required").nonempty("userId can't be empty"),
  title: z.string().optional(),
  content: z.string().optional(),
});

//delete a blog validator
export const DeleteBlogSchema = z.object({
  id: z.string().uuid("uuid required").nonempty("id can't be empty"),
  userId: z.string().uuid("uuid required").nonempty("userId can't be empty"),
});