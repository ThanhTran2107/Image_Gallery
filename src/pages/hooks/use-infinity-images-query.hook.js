import { filter } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

import { CACHED_ALBUMS } from 'pages/image-listing-page.constant';

import { useDetectNoScrollBar } from 'utilities/custom-hooks/use-detect-no-scroll-bar.hook';
import { useDetectScrollAtBottom } from 'utilities/custom-hooks/use-detect-scroll-at-bottom.hook';
import { useGetImages } from 'utilities/data-hooks/images/use-get-images.hook';

export const useInfinityImagesQuery = albumId => {
  const [images, setImages] = useState([]);
  const [lastDocId, setLastDocId] = useState('');
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const currentAlbumIdRef = useRef('');

  const getImages = useGetImages();

  const fetchImages = async () => {
    if (!albumId) return;

    try {
      setIsLoadingImages(true);

      const cachedImages = CACHED_ALBUMS[albumId] || [];

      const response = await getImages(albumId, lastDocId);

      if (response.data.length === 0) return;

      CACHED_ALBUMS[albumId] = [...cachedImages, ...response.data];

      if (albumId === currentAlbumIdRef.current) {
        setImages([...CACHED_ALBUMS[albumId]]);
        setLastDocId(response.lastDocId);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingImages(false);
    }
  };

  useDetectScrollAtBottom({
    func: () => fetchImages(),
    isDisabled: isLoadingImages,
    threshold: 300,
  });

  useDetectNoScrollBar({
    func: () => fetchImages(),
    isDisabled: images.length === 0 || isLoadingImages,
  });

  useEffect(() => {
    if (albumId) {
      const cachedImagesWithoutClientId = filter(images, img => !img.clientId);

      CACHED_ALBUMS[albumId] = [...cachedImagesWithoutClientId];

      const lastImage = CACHED_ALBUMS[albumId].at(-1);

      setLastDocId(lastImage ? lastImage.id : '');
    }
  }, [images]);

  useEffect(() => {
    setImages([]);
    setLastDocId('');
    setIsLoadingImages(false);
    currentAlbumIdRef.current = albumId;

    if (CACHED_ALBUMS[albumId]) {
      window.scrollTo(0, 0);
      const lastImage = CACHED_ALBUMS[albumId].at(-1);

      setImages([...CACHED_ALBUMS[albumId]]);
      setLastDocId(lastImage ? lastImage.id : '');
    } else {
      fetchImages().then(() => console.log('Loading more images!'));
    }
  }, [albumId]);

  return {
    images,
    setImages,
  };
};
