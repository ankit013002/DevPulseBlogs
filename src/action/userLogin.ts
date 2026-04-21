"use server";

import { getCollection } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import type { UserDocument, LoginState } from "@/types";
import { LoginInputSchema } from "@/lib/schemas";

export const login = async function (
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const rawInput = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  let user: { email: string; password: string };
  try {
    user = LoginInputSchema.parse(rawInput);
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: error.issues[0].message, success: "False" };
    }
    return { error: "Validation failed", success: "False" };
  }

  const userCollection = await getCollection<UserDocument>("users");
  const userData = await userCollection.findOne({ email: user.email });

  if (!userData) {
    return { error: "Invalid email/password", success: "False" };
  }

  const passwordMatch = bcrypt.compareSync(user.password, userData.password);

  if (!passwordMatch) {
    return { error: "Invalid email/password", success: "False" };
  }

  const secret = process.env.JWTSECRET;
  if (!secret) throw new Error("JWTSECRET is not configured");

  const token = jwt.sign(
    {
      userId: userData._id,
      exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24),
    },
    secret,
  );

  const cookie = await cookies();
  cookie.set("DevPulse", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/");
};
