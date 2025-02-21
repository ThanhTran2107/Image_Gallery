import { find, isEmpty } from 'lodash-es';
import { useEffect, useState } from 'react';

import { useGetAlbums } from 'utilities/data-hooks/albums/use-get-albums.hook';

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
    getAlbums()
      .then(data => {
        if (!isEmpty(data)) {
          setAlbumList(data);

          const currentAlbumId = window.localStorage.getItem('currentAlbumId');

          const found = find(data, alb => alb.id === currentAlbumId);

          if (!isEmpty(found)) {
            setCurrentAlbum(found);
          }
        }
      })
      .catch(e => console.log(e));
  }, []);

  return {
    currentAlbum,
    albumList,
    setCurrentAlbum,
    setAlbumList,
  };
};
