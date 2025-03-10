import { HTTP_POST, UPLOAD_IMAGE_END_POINT } from 'utilities/constant';

export const uploadImageService = async file => {
  const fd = new FormData();
  fd.append('image', file);

  const response = await window.fetch(UPLOAD_IMAGE_END_POINT, {
    method: HTTP_POST,
    body: fd,
  });

  if (!response.ok) throw new Error(`Upload failed: ${response.status} and ${response.statusText}`);

  return await response.json();
};
