import { db } from 'firebase-config';
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { useCallback } from 'react';

export const useGetImages = () => {
  return useCallback((albumId, lastDocId, pageSize = 100) => {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = collection(db, 'albums', albumId, 'images');
        const criteria = [docRef, orderBy('createdAt', 'desc'), limit(pageSize)];

        if (lastDocId) {
          const lastDocRef = doc(db, 'albums', albumId, 'images', lastDocId);
          const lastDoc = await getDoc(lastDocRef);

          lastDoc.exists() && criteria.push(startAfter(lastDoc));
        }

        const docSnap = await getDocs(query(...criteria));

        const data = docSnap.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        resolve({
          data,
          lastDocId: docSnap.docs[docSnap.docs.length - 1]?.id,
        });
      } catch (error) {
        reject(error);
      }
    });
  }, []);
};
