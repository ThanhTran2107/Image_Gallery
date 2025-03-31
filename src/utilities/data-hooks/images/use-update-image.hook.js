import { useMutation } from '@tanstack/react-query';
import { db } from 'firebase-config';
import { doc, updateDoc } from 'firebase/firestore';

export const useUpdateImage = () => {
  return useMutation({
    mutationFn: async ({ albumId, imageId, data }) => {
      const imagesRef = doc(db, 'albums', albumId, 'images', imageId);

      await updateDoc(imagesRef, data);

      return imagesRef.id;
    },
  });
};
