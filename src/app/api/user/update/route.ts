import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/getUser";
import { getCollection } from "@/lib/db";
import { ObjectId, Binary } from "mongodb";
import type { UserDocument, ImageData } from "@/types";

export async function PUT(req: NextRequest) {
  const userCookie = await getUserFromCookie();
  if (!userCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const firstName = (formData.get("firstName") as string)?.trim() ?? "";
  const lastName = (formData.get("lastName") as string)?.trim() ?? "";
  const bio = (formData.get("bio") as string)?.trim() ?? "";

  const updateFields: Partial<UserDocument> = { firstName, lastName, bio };

  const profilePictureFile = formData.get("profilePicture") as File | null;
  if (profilePictureFile && profilePictureFile.size > 0) {
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (profilePictureFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size exceeds 5 MB limit." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(profilePictureFile.type)) {
      return NextResponse.json({ error: "Invalid file type. Only JPG, PNG, GIF, and WebP are allowed." }, { status: 400 });
    }
    const arrayBuffer = await profilePictureFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const profilePicture: ImageData = {
      data: new Binary(buffer),
      filename: profilePictureFile.name,
      mimeType: profilePictureFile.type,
      size: buffer.length,
    };
    updateFields.profilePicture = profilePicture;
  }

  const userCollection = await getCollection<UserDocument>("users");
  await userCollection.updateOne(
    { _id: new ObjectId(userCookie.userId) },
    { $set: updateFields }
  );

  return NextResponse.json({ success: true });
}
