import { db } from 'firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';
import { useCallback } from 'react';

export const useDeleteImage = () => {
  return useCallback(async (albumId, imageId) => {
    const imagesRef = doc(db, 'albums', albumId, 'images', imageId);

    await deleteDoc(imagesRef);

    return imagesRef.id;
  }, []);
};
