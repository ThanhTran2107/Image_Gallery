import { MAX_FILE_SIZE_MB } from 'utilities/constant';

export const isValidImageSize = (file, maxSize = MAX_FILE_SIZE_MB) => {
  const maxSizeInByte = maxSize * 1024 * 1024;

  return file.size <= maxSizeInByte;
};
