"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromCookie() {
  const cookie = await cookies();
  const cookieValue = cookie.get("DevPulse")?.value;

  if (cookieValue) {
    try {
      const decoded = jwt.verify(cookieValue, process.env.JWTSECRET);
      return decoded;
    } catch (err) {
      return null;
    }
  }
}
