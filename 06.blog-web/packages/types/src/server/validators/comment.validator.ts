import { z } from "zod";

//create comments
export const CreateCommentSchema = z.object({
  userId: z.string().uuid("Invalid userId").nonempty("can't leave empty"),
  blogId: z.string().uuid("Invalid blogId").nonempty("can't leave empty"),
  comment: z.string().nonempty("Comment can't be empty"),
});

//create comments
export const GetCommentsSchema = z.object({
  blogId: z.string().uuid("Invalid blogId").nonempty("can't leave empty"),
});
