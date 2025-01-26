import { db } from 'firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { useCallback } from 'react';

export const useGetAlbums = () => {
  return useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        const idolsCollectionRef = collection(db, 'albums');
        const querySnapshot = await getDocs(idolsCollectionRef);

        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log('get');

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }, []);
};
