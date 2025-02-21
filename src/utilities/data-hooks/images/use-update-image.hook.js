import { db } from 'firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import { useCallback } from 'react';

export const useUpdateImage = () => {
  return useCallback(async (albumId, imageId, data) => {
    const imagesRef = doc(db, 'albums', albumId, 'images', imageId);

    await updateDoc(imagesRef, data);

    return imagesRef.id;
  }, []);
};
