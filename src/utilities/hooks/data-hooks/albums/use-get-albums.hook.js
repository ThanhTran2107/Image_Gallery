import { db } from 'firebase-config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useCallback } from 'react';

export const useGetAlbums = () => {
  return useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        const idolsCollectionRef = collection(db, 'albums');
        const criteria = [idolsCollectionRef, orderBy('order', 'asc')];

        const querySnapshot = await getDocs(query(...criteria));

        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }, []);
};
