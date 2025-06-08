export const getBase64Image = async function (image) {
  if (image) {
    const base64String = image.data.toString("base64");
    const mimeType = `Image.mimeType`;
    const dataUrl = `data:${mimeType};base64,${base64String}`;
    return dataUrl;
  } else {
    return null;
  }
};
