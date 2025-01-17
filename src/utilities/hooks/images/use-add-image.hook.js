import { useCallback } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from 'firebase-config';

export const useAddImage = () => {
  return useCallback((albumId, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const imagesRef = collection(db, 'albums', albumId, 'images');
        const docRef = await addDoc(imagesRef, data);

        return resolve(docRef.id);
      } catch (e) {
        reject(e);
      }
    });
  }, []);
};
