import { db } from 'firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';
import { useCallback } from 'react';

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
