import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserFromCookie } from "@/lib/getUser";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import type { UserDocument, ArticleDocument } from "@/types";

export async function DELETE() {
  const userCookie = await getUserFromCookie();
  if (!userCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userCollection = await getCollection<UserDocument>("users");
  const articleCollection = await getCollection<ArticleDocument>("articles");

  const user = await userCollection.findOne({ _id: new ObjectId(userCookie.userId) });
  const username = user?.username;

  // Delete all of the user's articles, then the user document
  await articleCollection.deleteMany({ userId: userCookie.userId });
  await userCollection.deleteOne({ _id: new ObjectId(userCookie.userId) });

  // Remove this user from other users' followers/following lists
  if (username) {
    await userCollection.updateMany(
      { $or: [{ followers: username }, { following: username }] },
      { $pull: { followers: username, following: username } }
    );
  }

  // Clear the auth cookie
  const cookieStore = await cookies();
  cookieStore.delete("DevPulse");

  return NextResponse.json({ success: true });
}
