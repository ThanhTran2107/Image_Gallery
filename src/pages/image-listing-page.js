import { filter, find, findIndex, map } from 'lodash-es';
import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { LOCALSTORAGE_KEY } from 'utilities/constant';
import { useCachedAlbums } from 'utilities/custom-hooks/use-cached-albums.hook';
import { useEnqueueUpload } from 'utilities/custom-hooks/use-enqueue-upload-image.hook';
import { useDeleteImage } from 'utilities/data-hooks/images/use-delete-image.hook';
import { useGetImages } from 'utilities/data-hooks/images/use-get-images.hook';
import { setLocalStorage } from 'utilities/services/common';

import { GalleryImages } from './components/gallery-images.component';
import { HeaderPage } from './components/header.component';
import { ListAlbums } from './components/list-albums.component';
import { ScrollButtons } from './components/scroll-buttons.component';
import { CACHED_ALBUMS_HASH } from './image-listing-page.constant';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1536px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: var(--background-color);
  color: var(--text-color);
`;

const { CURRENT_ALBUM_ID: CURRENT_ALBUM_ID_KEY } = LOCALSTORAGE_KEY;

export const ImageListingPage = () => {
  const [images, setImages] = useState([]);
  const { currentAlbum, setCurrentAlbum, albumList, setAlbumList } = useCachedAlbums();

  const getImages = useGetImages();
  const deleteImage = useDeleteImage();
  const albumId = currentAlbum.id;
  const enqueueUpload = useEnqueueUpload();

  const handleDeleteImages = deleteId => {
    const newImages = [...images];
    const foundIndex = findIndex(newImages, image => image.id === deleteId);

    if (foundIndex > -1) {
      const [data] = newImages.splice(foundIndex, 1);

      setImages(newImages);
      deleteImage(albumId, data.id);
    }
  };

  const handleFileUploadComplete = ({ clientId, id, url }) => {
    setImages(prevImages => {
      return map(prevImages, img => {
        if (img.clientId === clientId) return { clientId, id, url };

        return img;
      });
    });
  };

  const handleImagesAttached = data => setImages([...data, ...images]);

  const handleSetAlbumId = selectedId => {
    const selectedAlbum = find(albumList, alb => alb.id === selectedId);

    setLocalStorage(CURRENT_ALBUM_ID_KEY, selectedId);
    setCurrentAlbum(selectedAlbum);
  };

  const handleUpdateAlbum = updatedAlbum => {
    setCurrentAlbum(updatedAlbum);

    setAlbumList(albumList =>
      albumList.map(album => {
        if (album.id === updatedAlbum.id) return { ...updatedAlbum };

        return album;
      }),
    );
  };

  const handleAddAlbum = newAlbum => {
    setAlbumList([...albumList, { ...newAlbum }]);
    setCurrentAlbum(newAlbum);
  };

  const handleDeleteAlbum = deletedAlbumID => {
    const updatedAlbumList = filter(albumList, alb => alb.id != deletedAlbumID);

    setAlbumList(updatedAlbumList);
    setCurrentAlbum(updatedAlbumList[0]);
  };

  useEffect(() => {
    if (albumId) {
      const cacheImages = CACHED_ALBUMS_HASH[albumId];

      if (cacheImages) setImages(cacheImages);

      getImages(albumId)
        .then(({ data }) => {
          setImages(data);
          CACHED_ALBUMS_HASH[albumId] = data;
        })
        .catch(e => console.log(e));
    }
  }, [albumId]);

  return (
    <Wrapper>
      <HeaderPage
        album={currentAlbum}
        albums={albumList}
        imagesCount={images.length}
        onAddAlbum={handleAddAlbum}
        onUpdateAlbum={handleUpdateAlbum}
        onDeleteAlbum={handleDeleteAlbum}
      />

      <GalleryImages
        images={images}
        albumId={albumId}
        onEnqueueUpload={enqueueUpload}
        onDelete={handleDeleteImages}
        onFilesAttached={handleImagesAttached}
        onFileUploadComplete={handleFileUploadComplete}
      />

      <ScrollButtons />

      <ListAlbums albums={albumList} onSelectedAlbumId={handleSetAlbumId} />
    </Wrapper>
  );
};
