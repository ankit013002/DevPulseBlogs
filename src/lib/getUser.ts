"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import type { JwtPayload } from "@/types";

export async function getUserFromCookie(): Promise<JwtPayload | null> {
  const cookie = await cookies();
  const cookieValue = cookie.get("DevPulse")?.value;

  if (cookieValue) {
    try {
      const decoded = jwt.verify(
        cookieValue,
        process.env.JWTSECRET as string
      ) as JwtPayload;
      return decoded;
    } catch {
      return null;
    }
  }

  return null;
}
