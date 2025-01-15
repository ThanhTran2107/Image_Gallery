export const isValidImageSize = (file, maxSize = 1.5) => {
  const maxSizeInByte = maxSize * 1024 * 1024;

  return file.size <= maxSizeInByte;
};
