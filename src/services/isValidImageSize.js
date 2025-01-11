export const isValidImageSize = (file, maxSize = 10) => {
  const maxSizeInByte = maxSize * 1024 * 1024;

  return file.size <= maxSizeInByte;
};
