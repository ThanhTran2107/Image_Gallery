import { find } from 'lodash-es';
import { useEffect, useState } from 'react';

import { LOCALSTORAGE_KEY } from 'utilities/constant';
import { useGetAlbums } from 'utilities/data-hooks/albums/use-get-albums.hook';
import { getLocalStorage } from 'utilities/services/common';

const { CURRENT_ALBUM_ID: CURRENT_ALBUM_ID_KEY } = LOCALSTORAGE_KEY;

export const useCachedAlbums = () => {
  const [currentAlbum, setCurrentAlbum] = useState({});
  const [albumList, setAlbumList] = useState([]);
  const getAlbums = useGetAlbums();

  // get albums list
  // get select current album id from local storage
  // check cached current album id is exists in album list
  // if exist => set album by method setCurrentAlbum
  // if not exist => skip

  useEffect(() => {
    (async () => {
      try {
        const data = await getAlbums();
        setAlbumList(data);

        const currentAlbumId = getLocalStorage(CURRENT_ALBUM_ID_KEY);
        const found = find(data, alb => alb.id === currentAlbumId);

        setCurrentAlbum(found);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return {
    currentAlbum,
    albumList,
    setCurrentAlbum,
    setAlbumList,
  };
};
