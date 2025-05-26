"use server";

import { getCollection } from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const register = async function (prevState, formData) {
  // const usersCollection = await getCollection("users");
  // await usersCollection.insertOne({})

  const user = {
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  };

  const error = {};

  if (user.username.length == 0) {
    error.username = "Error: Field cannot be empty";
  }

  if (user.password.length == 0) {
    error.password = "Error: Field cannot be empty";
  }

  if (user.email.length == 0) {
    error.email = "Error: Field cannot be empty";
  }

  if (user.email !== formData.get("confirmemail")) {
    error.email = "Error: Confirmation email does not match email";
  }

  if (error.username || error.password || error.email) {
    return {
      error: error,
      success: false,
    };
  }

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);

  const userCollection = await getCollection("users");
  const userData = await userCollection.insertOne(user);
  const userId = userData.insertedId.toString();

  const token = jwt.sign(
    { userId: userId, exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24) },
    process.env.JWTSECRET
  );

  const cookieStore = await cookies();

  cookieStore.set("DevPulse", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    secure: true,
  });

  return {
    success: true,
  };
};
