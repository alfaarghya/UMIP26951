import { CookieOptions } from "express";

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict", // ✅ TypeScript now understands it's a valid value
  maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
};
