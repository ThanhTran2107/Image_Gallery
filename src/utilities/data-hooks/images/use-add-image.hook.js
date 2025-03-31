import { useMutation } from '@tanstack/react-query';
import { db } from 'firebase-config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export const useAddImage = () => {
  return useMutation({
    mutationFn: async ({ albumId, data }) => {
      const imagesRef = collection(db, 'albums', albumId, 'images');
      const docRef = await addDoc(imagesRef, {
        ...data,
        createdAt: serverTimestamp(),
      });

      return docRef.id;
    },
  });
};
