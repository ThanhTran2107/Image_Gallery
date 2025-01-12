import { UPLOAD_IMAGE_END_POINT, HTTP_POST } from "../constant";

export const uploadImageService = async (file) => {
  return new Promise((resolve) => {
    const fd = new FormData();
    fd.append('image', file);

    window
      .fetch(UPLOAD_IMAGE_END_POINT, {
        method: HTTP_POST,
        body: fd,
      })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      });
  });
};
