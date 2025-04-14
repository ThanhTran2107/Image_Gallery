import { filter, map } from 'lodash-es';

import { QUERY_KEYS } from 'utilities/constant';
import { queryClient } from 'utilities/constant';

const { IMAGES } = QUERY_KEYS;

export const imageCacheService = {
  addImage: ({ albumId, newImage }) => {
    queryClient.setQueryData([IMAGES, albumId], oldData => {
      if (!oldData) {
        return {
          pages: [{ data: [newImage] }],
          pageParams: [],
        };
      }

      const updatedPages = [...oldData.pages];

      updatedPages[0] = {
        ...updatedPages[0],
        data: [newImage, ...updatedPages[0].data],
      };

      return {
        ...oldData,
        pages: updatedPages,
      };
    });
  },

  deleteImage: ({ albumId, imageId }) => {
    queryClient.setQueryData([IMAGES, albumId], oldData => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: map(oldData.pages, page => ({
          ...page,
          data: filter(page.data, img => img.id !== imageId),
        })),
      };
    });
  },
};
