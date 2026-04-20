"use server";

import { getCollection } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { UserDocument, LoginState } from "@/types";

export const login = async function (
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const user = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const userCollection = await getCollection<UserDocument>("users");
  const userData = await userCollection.findOne({ email: user.email });

  if (!userData) {
    return { error: "Invalid email/password", success: "False" };
  }

  const passwordMatch = bcrypt.compareSync(user.password, userData.password);

  if (!passwordMatch) {
    return { error: "Invalid email/password", success: "False" };
  }

  const token = jwt.sign(
    {
      userId: userData._id,
      exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24),
    },
    process.env.JWTSECRET as string,
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
