import { useInfiniteQuery } from '@tanstack/react-query';
import { db } from 'firebase-config';
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';

import { QUERY_KEYS } from 'utilities/constant';

const { IMAGES } = QUERY_KEYS;

const getImages = async ({ albumId, lastDocId, pageSize }) => {
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

  return {
    data,
    lastDocId: docSnap.docs[docSnap.docs.length - 1]?.id,
  };
};

export const useGetImages = (albumId, pageSize = 100) => {
  return useInfiniteQuery({
    queryKey: [IMAGES, albumId],
    queryFn: ({ pageParam = '' }) => getImages({ albumId, lastDocId: pageParam, pageSize }),
    getNextPageParam: lastPage => lastPage.lastDocId,
  });
};
