import { useMutation } from '@tanstack/react-query';
import { db } from 'firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const useUpdateAlbum = () => {
  return useMutation({
    mutationFn: async ({ albumId, album }) => {
      const albumRef = doc(db, 'albums', albumId);
      const snapshot = await getDoc(albumRef);

      if (!snapshot.exists()) throw new Error('album not exists');

      await updateDoc(albumRef, { ...album });
    },
  });
};
