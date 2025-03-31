import { useMutation } from '@tanstack/react-query';
import { db } from 'firebase-config';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

export const useAddAlbum = () => {
  return useMutation({
    mutationFn: async album => {
      const albumRef = collection(db, 'albums');
      const q = query(albumRef, where('name', '==', album.name));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) throw new Error('duplicate album');

      const docRef = await addDoc(albumRef, album);

      return docRef.id;
    },
  });
};
