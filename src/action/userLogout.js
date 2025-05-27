"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async function () {
  const cookie = await cookies();
  cookie.delete("DevPulse");

  redirect("/");
};
