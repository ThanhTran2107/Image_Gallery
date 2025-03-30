import { useQuery } from '@tanstack/react-query';
import { db } from 'firebase-config';
import { collection, getCountFromServer } from 'firebase/firestore';

import { QUERY_KEYS } from 'utilities/constant';

const { IMAGES_SIZE } = QUERY_KEYS;

const getImagesSize = async albumId => {
  const docRef = collection(db, 'albums', albumId, 'images');

  const countSnapshot = await getCountFromServer(docRef);

  return countSnapshot.data().count;
};

export const useGetImagesSize = options => {
  const { albumId } = options;

  return useQuery({
    queryKey: [IMAGES_SIZE, albumId],
    queryFn: () => getImagesSize(options.albumId),
    ...options,
  });
};
