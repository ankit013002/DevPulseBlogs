export const getBase64Image = async function (articleImage) {
  if (articleImage) {
    const base64String = articleImage.data.toString("base64");
    const mimeType = `articleImage.mimeType`;
    const dataUrl = `data:${mimeType};base64,${base64String}`;
    return dataUrl;
  } else {
    return null;
  }
};
