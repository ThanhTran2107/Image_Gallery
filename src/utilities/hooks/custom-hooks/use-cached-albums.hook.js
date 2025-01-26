import { find, isEmpty } from 'lodash-es';
import { useEffect, useState } from 'react';

import { useGetAlbums } from '../albums/use-get-albums.hook';

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
        const albums = await getAlbums();

        if (!isEmpty(albums)) {
          setAlbumList(albums);

          const currentAlbumId = window.localStorage.getItem('currentAlbumId');

          const found = find(albums, alb => alb.id === currentAlbumId);

          if (!isEmpty(found)) {
            setCurrentAlbum(found);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return {
    currentAlbum,
    albumList,
    setCurrentAlbum,
  };
};
