import { find } from 'lodash-es';
import { useEffect, useState } from 'react';

import { LOCALSTORAGE_KEY } from 'utilities/constant';
import { queryClient } from 'utilities/constant';
import { useGetAlbums } from 'utilities/data-hooks/albums/use-get-albums.hook';
import { getLocalStorage } from 'utilities/services/common';

const { CURRENT_ALBUM_ID: CURRENT_ALBUM_ID_KEY } = LOCALSTORAGE_KEY;

export const useCachedAlbums = () => {
  const [currentAlbum, setCurrentAlbum] = useState({});
  const [albumList, setAlbumList] = useState([]);
  const { data: albums } = useGetAlbums();

  useEffect(() => {
    if (albums) {
      setAlbumList(albums);

      const currentAlbumId = getLocalStorage(CURRENT_ALBUM_ID_KEY) || albums[0].id;
      const found = find(albums, alb => alb.id === currentAlbumId);

      setCurrentAlbum(found);
    }
  }, [albums]);

  const handleSetAlbumList = newData => queryClient.setQueryData(['albums'], newData);

  return {
    currentAlbum,
    albumList,
    setCurrentAlbum,
    setAlbumList: handleSetAlbumList,
  };
};
