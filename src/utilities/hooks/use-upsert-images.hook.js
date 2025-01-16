import { useCallback } from 'react';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { FIRE_BASE_IMAGE_FIELD_ID, FIRE_BASE_IMAGE_TABLE } from '../../constant';

import { db } from 'firebase-config';

export const useUpsertImages = () => {
  return useCallback(async data => {
    const docRef = doc(db, FIRE_BASE_IMAGE_TABLE, FIRE_BASE_IMAGE_FIELD_ID);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, data);

      return;
    }

    await setDoc(docRef, { ...data });
  }, []);
};
