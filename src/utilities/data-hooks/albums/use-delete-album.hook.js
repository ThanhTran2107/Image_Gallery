import { useMutation } from '@tanstack/react-query';
import { db } from 'firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';

export const useDeleteAlbum = () => {
  return useMutation({
    mutationFn: async albumId => {
      const albumRef = doc(db, 'albums', albumId);

      await deleteDoc(albumRef);

      return albumRef.id;
    },
  });
};
