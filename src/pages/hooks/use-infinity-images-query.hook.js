import { flatMap, isEmpty } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

import { useDetectNoScrollBar } from 'utilities/custom-hooks/use-detect-no-scroll-bar.hook';
import { useDetectScrollAtBottom } from 'utilities/custom-hooks/use-detect-scroll-at-bottom.hook';
import { useGetImages } from 'utilities/data-hooks/images/use-get-images.hook';

export const useInfinityImagesQuery = albumId => {
  const [images, setImages] = useState([]);
  const currentAlbumIdRef = useRef('');

  const { data, hasNextPage, fetchNextPage, isLoading } = useGetImages(albumId);

  const fetchImages = async () => {
    if (!albumId || !data) return;

    const allImages = flatMap(data.pages, page => page.data);

    if (albumId === currentAlbumIdRef.current) setImages([...allImages]);
  };

  useDetectScrollAtBottom({
    func: () => fetchNextPage(),
    isDisabled: isLoading && !hasNextPage,
    threshold: 300,
  });

  useDetectNoScrollBar({
    func: () => fetchNextPage(),
    isDisabled: isEmpty(images) || isLoading,
  });

  useEffect(() => {
    fetchImages().then(() => console.log('Loading more images!'));
  }, [data]);

  useEffect(() => {
    setImages([]);
    currentAlbumIdRef.current = albumId;

    fetchImages().then(() => console.log('Loading more images!'));
  }, [albumId]);

  return {
    images,
    setImages,
  };
};
