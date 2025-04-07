import { z } from "zod";

// User Signup Schema
export const UserSignUpSchema = z.object({
  name: z.string().max(50).nonempty("Name can't be empty"),
  username: z.string().max(25, "user name must be within 25 characters").nonempty("username can't be empty"),
  email: z.string().email().nonempty("email can't be empty"),
  password: z.string().min(8, "password need to be at least 8 characters").nonempty("password can't be empty"),
});

// User Signin Schema
export const UserSignInSchema = z.object({
  username: z.string().max(25, "user name must be within 25 characters").nonempty("username can't be empty"),
  password: z.string().min(8, "password need to be at least 8 characters").nonempty("password can't be empty"),
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

//validation for joining room
export const JoinRoomSchema = z.object({
  roomName: z.string().min(3, "Room name must be at least 3 characters long"),
  userId: z.string().uuid()
});

//validate update room
export const UpdateRoomSchema = z.object({
  roomId: z.string().uuid("Invalid room ID format"),
  userId: z.string().uuid("Invalid user ID format"),
  newRoomName: z.string().min(3, "Room name must be at least 3 characters long").optional(),
  removeUserId: z.string().uuid("Invalid user ID format").optional(),
});

//validate delete room
export const DeleteRoomSchema = z.object({
  roomId: z.string().uuid("Invalid room ID format"), // Room ID must be a valid UUID
  userId: z.string().uuid("Invalid admin ID format"), // Admin ID must be a valid UUID
});

//validate user search
export const UserSearchSchema = z.object({
  username: z.string()
});

//validate get Room details
export const GetRoomDetailsSchema = z.object({
  roomId: z.string().uuid("Invalid room ID format")
})