import type { ImageData } from "@/types";

export const getBase64Image = async function (
  image: ImageData | null | undefined
): Promise<string | null> {
  if (image) {
    const base64String = image.data.toString("base64");
    const dataUrl = `data:${image.mimeType};base64,${base64String}`;
    return dataUrl;
  }
  return null;
};
