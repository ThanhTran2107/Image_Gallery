import { useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebase-config';

export const useGetImages = () => {
  return useCallback(albumId => {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = collection(db, 'albums', albumId, 'images');
        const docSnap = await getDocs(docRef);

        const data = docSnap.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        return resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }, []);
};
