"use server";

import { getCollection } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export const deleteArticle = async function (prevState, formData) {
  const link = formData.get("link");
  const articlesCollection = await getCollection("articles");
  articlesCollection.deleteOne({ link: link });
  revalidatePath("/");
};
