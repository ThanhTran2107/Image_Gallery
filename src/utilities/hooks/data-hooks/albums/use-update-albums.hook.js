import { db } from 'firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useCallback } from 'react';

export const useUpdateAlbum = () => {
  return useCallback(async (albumId, album) => {
    const albumRef = doc(db, 'albums', albumId);
    const snapshot = await getDoc(albumRef);

    if (!snapshot.exists()) throw new Error('album not exists');

    await updateDoc(albumRef, { ...album });
  }, []);
};
