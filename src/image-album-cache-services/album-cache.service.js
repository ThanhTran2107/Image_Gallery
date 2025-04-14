import { filter, map } from 'lodash-es';

import { QUERY_KEYS } from 'utilities/constant';
import { queryClient } from 'utilities/constant';

const { ALBUMS, IMAGES } = QUERY_KEYS;

export const albumCacheService = {
  addAlbum: newAlbum => {
    queryClient.setQueryData([ALBUMS], oldAlbums => {
      if (!oldAlbums) return [newAlbum];

      return [...oldAlbums, newAlbum];
    });
  },

  updateAlbum: updatedAlbum => {
    queryClient.setQueryData([ALBUMS], oldAlbums => {
      if (!oldAlbums) return oldAlbums;

      return map(oldAlbums, album => (album.id === updatedAlbum.id ? { ...album, ...updatedAlbum } : album));
    });
  },

  deleteAlbum: albumId => {
    queryClient.setQueryData([ALBUMS], oldAlbums => {
      if (!oldAlbums) return oldAlbums;

      return filter(oldAlbums, album => album.id !== albumId);
    });

    queryClient.removeQueries([IMAGES, albumId]);
  },
};
