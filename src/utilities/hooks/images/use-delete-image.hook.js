import { useCallback } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from 'firebase-config';

export const useDeleteImage = () => {
  return useCallback((albumId, imageId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const imagesRef = doc(db, 'albums', albumId, 'images', imageId);

        await deleteDoc(imagesRef);

        resolve(imagesRef.id);
      } catch (e) {
        reject(e);
      }
    });
  }, []);
};
