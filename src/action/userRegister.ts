"use server";

import { getCollection } from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Binary } from "mongodb";
import type { UserDocument, RegisterState, ImageData } from "@/types";

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

  const error: RegisterState["error"] = {};

  if (username.length === 0) {
    error.username = "Error: Field cannot be empty";
  }
  if (password.length === 0) {
    error.password = "Error: Field cannot be empty";
  }
  if (email.length === 0) {
    error.email = "Error: Field cannot be empty";
  }
  if (email !== formData.get("confirmemail")) {
    error.email = "Error: Confirmation email does not match email";
  }

  if (error.username || error.password || error.email) {
    return { error, success: false };
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user: Omit<UserDocument, "_id"> = {
    username,
    password: hashedPassword,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    profilePicture,
    email,
    followers: [],
    following: [],
    likedArticles: [],
  };

  const userCollection = await getCollection<UserDocument>("users");
  const userData = await userCollection.insertOne(user as UserDocument);
  const userId = userData.insertedId.toString();

  const token = jwt.sign(
    { userId, exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24) },
    process.env.JWTSECRET as string,
  );

  const cookieStore = await cookies();
  cookieStore.set("DevPulse", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    secure: process.env.NODE_ENV === "production",
  });

  return { success: true };
};
