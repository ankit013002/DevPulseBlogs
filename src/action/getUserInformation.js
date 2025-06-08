"use server";

import { ObjectId } from "mongodb";

const { getCollection } = require("@/lib/db");

export const getUserInformationById = async function (userId) {
  const userCollection = await getCollection("users");
  const user = await userCollection.findOne({
    _id: new ObjectId(userId),
  });

  return user;
};

export const getUserInformationByUserName = async function (username) {
  const userCollection = await getCollection("users");
  const user = await userCollection.findOne({ username: username });
  return user;
};
