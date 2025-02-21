import { db } from 'firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';
import { useCallback } from 'react';

export const useDeleteAlbum = () => {
  return useCallback(async albumId => {
    const albumRef = doc(db, 'albums', albumId);

    await deleteDoc(albumRef);

    return albumRef.id;
  }, []);
};
