import { ChangeEvent } from "react";
import { SigninSchema, SignupSchema } from "../server";
import z from "zod";

export type SignupType = z.infer<typeof SignupSchema>;

export type SigninType = z.infer<typeof SigninSchema>;

export interface LabelledInputType {
  type?: string;
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface BlogCardType {
  username: string;
  id: string;
  title: string;
  content: string;
  date: string
}

export interface BlogType {
  id: string;
  title: string;
  content: string;
  createdAt: string
  author: {
    username: string;
  };
}

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  id: z.string(),
});

export type CreatePostType = z.infer<typeof createBlogInput>;
export type UpdatePostType = z.infer<typeof updateBlogInput>;

export type CommentType = {
  id: string;
  userId: string;
  blogId: string;
  comment: string;
  createdAt: string;
  user: {
    username: string;
  };
};

export interface updateBlogType {
  id: string;
  title: string;
  content: string;
}
