import { db } from 'firebase-config';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { useCallback } from 'react';

export const useGetImages = () => {
  return useCallback(albumId => {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = collection(db, 'albums', albumId, 'images');
        const docQuery = query(docRef, limit(100));

        const docSnap = await getDocs(docQuery);

        const data = docSnap.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }, []);
};
