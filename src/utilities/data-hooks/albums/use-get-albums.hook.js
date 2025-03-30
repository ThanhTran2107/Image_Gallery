import { useQuery } from '@tanstack/react-query';
import { db } from 'firebase-config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import { QUERY_KEYS } from 'utilities/constant';

const { ALBUMS } = QUERY_KEYS;

const fetchAlbums = async () => {
  const idolsCollectionRef = collection(db, 'albums');
  const criteria = [idolsCollectionRef, orderBy('order', 'asc')];

  const querySnapshot = await getDocs(query(...criteria));

  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const useGetAlbums = options => {
  return useQuery({
    queryKey: [ALBUMS],
    queryFn: () => fetchAlbums(),
    ...options,
  });
};
