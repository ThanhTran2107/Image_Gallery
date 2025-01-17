import { useCallback } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from 'firebase-config';

export const useDeleteAlbum = () => {
  return useCallback(albumId => {
    return new Promise(async (resolve, reject) => {
      try {
        const albumRef = doc(db, 'albums', albumId);

        await deleteDoc(albumRef);

        resolve(albumRef.id);
      } catch (e) {
        reject(e);
      }
    });
  }, []);
};
