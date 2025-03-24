import crypto from "crypto";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const SECRET_KEY = process.env.SECRET_KEY || "default_secret";

export const encryptMessage = (message: string): string => {
  const cipher = crypto.createCipheriv("aes-256-cbc", SECRET_KEY, crypto.randomBytes(16));
  let encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decryptMessage = (encryptedMessage: string): string => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", SECRET_KEY, crypto.randomBytes(16));
  let decrypted = decipher.update(encryptedMessage, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
