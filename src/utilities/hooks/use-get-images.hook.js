import { useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebase-config';
import { FIRE_BASE_IMAGE_FIELD_ID, FIRE_BASE_IMAGE_TABLE } from 'constant';

export const useGetImagesHook = () => {
  return useCallback(async () => {
    return new Promise(async (resolve, reject) => {
      const docRef = doc(db, FIRE_BASE_IMAGE_TABLE, FIRE_BASE_IMAGE_FIELD_ID); // Chỉ định document bằng docId
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        resolve(docSnap.data());

        return;
      }

      resolve();
    });
  }, []);
};
