"use server";

import { getCollection } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { ArticleDocument } from "@/types";

export const deleteArticle = async function (
  _prevState: object,
  formData: FormData
): Promise<void> {
  const link = formData.get("link") as string;
  const articlesCollection = await getCollection<ArticleDocument>("articles");
  await articlesCollection.deleteOne({ link });
  revalidatePath("/");
};
