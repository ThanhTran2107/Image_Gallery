import { db } from 'firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useCallback } from 'react';

export const useUpdateAlbum = () => {
  return useCallback((albumId, album) => {
    return new Promise(async (resolve, reject) => {
      try {
        const albumRef = doc(db, 'albums', albumId);
        const snapshot = await getDoc(albumRef);

        if (!snapshot.exists()) {
          reject('album not exists');

          return;
        }

        await updateDoc(albumRef, { ...album });

        return resolve();
      } catch (e) {
        reject(e);
      }
    });
  }, []);
};
