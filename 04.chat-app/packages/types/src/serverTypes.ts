import { z } from "zod";

// User Signup Schema
export const UserSignUpSchema = z.object({
  username: z.string().max(25),
  email: z.string().email(),
  password: z.string().min(8),
});

// User Signin Schema
export const UserSignInSchema = z.object({
  username: z.string().max(25),
  password: z.string().min(8),
});


//validation for list
export const GetUserChatsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

// Validation for retrieving messages
export const GetMessagesSchema = z.object({
  userId: z.string().uuid(),
  inboxId: z.string().uuid().optional(), // Required for direct messages
  roomId: z.string().uuid().optional(), // Required for room messages
}).refine((data) => data.userId || data.roomId, {
  message: "Must provide either userId (for direct messages) or roomId (for room messages)",
});

// Validation for creating a chat room
export const CreateRoomSchema = z.object({
  roomName: z.string().min(3, "Room name must be at least 3 characters long"),
  userId: z.string().uuid("Invalid user ID format"),
});
