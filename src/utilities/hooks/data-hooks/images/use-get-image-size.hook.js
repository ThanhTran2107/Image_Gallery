import { db } from 'firebase-config';
import { collection, getCountFromServer } from 'firebase/firestore';
import { useCallback } from 'react';

export const useGetImagesSize = () => {
  return useCallback(async albumId => {
    const docRef = collection(db, 'albums', albumId, 'images');

    const countSnapshot = await getCountFromServer(docRef);

    return countSnapshot.data().count;
  }, []);
};
