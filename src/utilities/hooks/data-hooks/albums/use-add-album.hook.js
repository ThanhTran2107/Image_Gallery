import { db } from 'firebase-config';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useCallback } from 'react';

export const useAddAlbum = () => {
  return useCallback(async album => {
    const albumRef = collection(db, 'albums');
    const q = query(albumRef, where('name', '==', album.name));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) throw new Error('duplicate album');

    const docRef = await addDoc(albumRef, album);

    return docRef.id;
  }, []);
};
