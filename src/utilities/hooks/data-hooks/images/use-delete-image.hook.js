import { db } from 'firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';
import { useCallback } from 'react';

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
