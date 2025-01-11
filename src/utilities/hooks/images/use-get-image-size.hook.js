import { db } from 'firebase-config';
import { collection, getCountFromServer } from 'firebase/firestore';
import { useCallback } from 'react';

export const useGetImagesSize = () => {
  return useCallback(albumId => {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = collection(db, 'albums', albumId, 'images');

        const countSnapshot = await getCountFromServer(docRef);

        return resolve(countSnapshot.data().count);
      } catch (error) {
        reject(error);
      }
    });
  }, []);
};
