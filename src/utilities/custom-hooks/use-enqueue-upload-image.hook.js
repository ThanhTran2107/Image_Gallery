import { isEmpty } from 'lodash-es';
import { useRef } from 'react';

import { uploadImageService } from 'utilities/services/uploadImageService';

export const useEnqueueUpload = (max = 100) => {
  const queueRef = useRef([]);
  const activeUploads = useRef(0);

  const processQueue = async () => {
    if (activeUploads.current >= max || isEmpty(queueRef.current)) return;

    activeUploads.current += 1;
    const { file, resolve, reject } = queueRef.current.shift();

    try {
      const response = await uploadImageService(file);

      resolve(response);
    } catch (e) {
      reject(e);
    } finally {
      activeUploads.current -= 1;

      await processQueue();
    }
  };

  return file => {
    return new Promise(async (resolve, reject) => {
      queueRef.current.push({ file, resolve, reject });

      await processQueue();
    });
  };
};
