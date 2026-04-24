"use server";

import { getCollection } from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Binary } from "mongodb";
import type { UserDocument, RegisterState, ImageData } from "@/types";
import { UserInputSchema } from "@/lib/schemas";
import { ZodError } from "zod";

export const register = async function (
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const profilePictureFile = formData.get("profilePicture") as File | null;
  let profilePicture: ImageData | null = null;

  if (profilePictureFile && profilePictureFile.size > 0) {
    const arrayBuffer = await profilePictureFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    profilePicture = {
      data: new Binary(buffer),
      filename: profilePictureFile.name,
      mimeType: profilePictureFile.type,
      size: buffer.length,
    };
  }
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;
  const confirmemail = formData.get("confirmemail") as string;

  // Check email confirmation (Zod can't do this)
  if (email !== confirmemail) {
    return {
      error: { email: "Error: Confirmation email does not match email" },
      success: false,
    };
  }

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  // Validate raw input BEFORE hashing — the schema checks password strength
  try {
    UserInputSchema.parse({ username, password, firstName, lastName, email, profilePicture });
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = error.flatten().fieldErrors as Record<string, string[] | undefined>;
      return {
        error: {
          username: fieldErrors["username"]?.[0],
          email: fieldErrors["email"]?.[0],
          password: fieldErrors["password"]?.[0],
        },
        success: false,
      };
    }
    return { error: { email: "Error: Validation failed. Please try again." }, success: false };
  }

  const user = {
    username,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    firstName,
    lastName,
    profilePicture,
    email,
    followers: [],
    following: [],
    likedArticles: [],
  };

  try {
    const userCollection = await getCollection<UserDocument>("users");

    // Check for duplicate email or username
    const existingUser = await userCollection.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return {
          error: { email: "Error: Email already in use" },
          success: false,
        };
      }
      if (existingUser.username === username) {
        return {
          error: { username: "Error: Username already taken" },
          success: false,
        };
      }
    }

    const userData = await userCollection.insertOne(user);
    const userId = userData.insertedId.toString();

    const secret = process.env.JWTSECRET;
    if (!secret) throw new Error("JWTSECRET not configured");

    const token = jwt.sign(
      { userId, exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24) },
      secret,
    );

    const cookieStore = await cookies();
    cookieStore.set("DevPulse", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      error: { email: "Error: Registration failed. Please try again." },
      success: false,
    };
  }
};
