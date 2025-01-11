import { db } from 'firebase-config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useCallback } from 'react';

export const useAddImage = () => {
  return useCallback((albumId, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const imagesRef = collection(db, 'albums', albumId, 'images');
        const docRef = await addDoc(imagesRef, {
          ...data,
          createdAt: serverTimestamp(),
        });

        return resolve(docRef.id);
      } catch (e) {
        reject(e);
      }
    });
  }, []);
};
