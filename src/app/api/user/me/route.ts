import { NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/getUser";
import { getUserInformationById } from "@/action/getUserInformation";
import { getBase64Image } from "@/action/getBase64Image";

export async function GET() {
  const userCookie = await getUserFromCookie();
  if (!userCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserInformationById(userCookie.userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const profilePicture = await getBase64Image(user.profilePicture);

  return NextResponse.json({
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio ?? "",
    profilePicture,
  });
}
