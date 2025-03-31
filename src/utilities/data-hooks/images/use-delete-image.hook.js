import { useMutation } from '@tanstack/react-query';
import { db } from 'firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';

export const useDeleteImage = () => {
  return useMutation({
    mutationFn: async ({ albumId, imageId }) => {
      const imagesRef = doc(db, 'albums', albumId, 'images', imageId);

      await deleteDoc(imagesRef);

      return imagesRef.id;
    },
  });
};
