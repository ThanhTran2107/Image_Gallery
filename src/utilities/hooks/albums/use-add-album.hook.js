import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

import { db } from 'firebase-config';
import { useCallback } from 'react';

export const useAddAlbum = () => {
  return useCallback(album => {
    return new Promise(async (resolve, reject) => {
      try {
        const albumRef = collection(db, 'albums');
        const q = query(albumRef, where('name', '==', album.name));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          reject('duplicate album');

          return;
        }

        const docRef = await addDoc(albumRef, album);

        return resolve(docRef.id);
      } catch (e) {
        reject(e);
      }
    });
  }, []);
};
