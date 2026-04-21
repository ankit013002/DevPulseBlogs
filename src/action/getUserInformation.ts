"use server";

import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db";
import type { UserDocument } from "@/types";

export const getUserInformationById = async function (
  userId: string,
): Promise<UserDocument | null> {
  if (!ObjectId.isValid(userId)) {
    return null;
  }

  const userCollection = await getCollection<UserDocument>("users");
  const user = await userCollection.findOne({ _id: new ObjectId(userId) });
  return user;
};

export const getUserInformationByUserName = async function (
  username: string,
): Promise<UserDocument | null> {
  const userCollection = await getCollection<UserDocument>("users");
  const user = await userCollection.findOne({ username });
  return user;
};
