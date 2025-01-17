import { useCallback } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebase-config';

export const useUpdateImage = () => {
  return useCallback((albumId, imageId, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const imagesRef = doc(db, 'albums', albumId, 'images', imageId);

        await updateDoc(imagesRef, data);

        resolve(imagesRef.id);
      } catch (error) {
        reject(error);
      }
    });
  }, []);
};
