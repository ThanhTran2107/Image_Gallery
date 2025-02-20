import { db } from 'firebase-config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useCallback } from 'react';

export const useAddImage = () => {
  return useCallback(async (albumId, data) => {
    const imagesRef = collection(db, 'albums', albumId, 'images');
    const docRef = await addDoc(imagesRef, {
      ...data,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  }, []);
};
