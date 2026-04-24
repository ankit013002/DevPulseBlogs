import { Binary } from "mongodb";
import { z } from "zod";

export const LoginInputSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const UserInputSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  profilePicture: z
    .object({
      data: z.instanceof(Binary),
      filename: z.string(),
      mimeType: z.string().regex(/^image\//, "File must be an image"),
      size: z.number().max(5 * 1024 * 1024, "Image must be under 5MB"),
    })
    .nullable(),
});

export const ArticleInputSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be at most 200 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  tags: z.array(z.string()).max(10, "You can add at most 10 tags"),
  coverImage: z
    .object({
      data: z.instanceof(Binary),
      filename: z.string(),
      mimeType: z.string(),
      size: z.number().max(5 * 1024 * 1024, "Image must be under 5MB"),
    })
    .nullable()
    .optional(),
});

export const UserSchema = UserInputSchema.extend({
  password: z.string(), // stored as hash
  followers: z.array(z.string()),
  following: z.array(z.string()),
  likedArticles: z.array(z.string()),
  bio: z.string().optional(),
});

export const ArticleSchema = ArticleInputSchema.extend({
  userId: z.string(),
  link: z
    .string()
    .regex(
      /^[a-z0-9]+$/,
      "Link can only contain lowercase letters and numbers",
    ),
  author: z.string(),
  date: z.string(),
  updatedAt: z.string().optional(),
});
