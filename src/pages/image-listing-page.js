import { albumCacheService } from 'image-album-cache-services/album-cache.service';
import { imageCacheService } from 'image-album-cache-services/image-cache.service';
import { filter, find, findIndex, forEach, isEmpty, map } from 'lodash-es';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import { useCachedAlbums } from 'pages/hooks/use-cached-albums.hook';

import { notification } from 'components/notification.component';

import { LOCALSTORAGE_KEY } from 'utilities/constant';
import { useEnqueueUpload } from 'utilities/custom-hooks/use-enqueue-upload-image.hook';
import { useDeleteImage } from 'utilities/data-hooks/images/use-delete-image.hook';
import { useGetImagesSize } from 'utilities/data-hooks/images/use-get-image-size.hook';
import { setLocalStorage } from 'utilities/services/common';
import { downloadImageService } from 'utilities/services/image';

import { EmptyAlbumPlaceholder } from './components/empty-album-placeholder.component';
import { GalleryImages } from './components/gallery-images.component';
import { HeaderPage } from './components/header.component';
import { ListAlbums } from './components/list-albums.component';
import { ScrollButtons } from './components/scroll-buttons.component';
import { useInfinityImagesQuery } from './hooks/use-infinity-images-query.hook';

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
  const [isReuploadingAll, setIsReUploadingAll] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imagesCount, setImagesCount] = useState(0);

  const { currentAlbum, setCurrentAlbum, albumList, setAlbumList } = useCachedAlbums();
  const { images, setImages } = useInfinityImagesQuery(currentAlbum?.id);
  const { mutateAsync: deleteImage } = useDeleteImage();
  const enqueueUpload = useEnqueueUpload();
  const { data: imagesSize } = useGetImagesSize({ albumId: currentAlbum?.id, enabled: !!currentAlbum?.id });
  const { formatMessage } = useIntl();

  const albumId = currentAlbum?.id;

  const handleDeleteImages = async deletedId => {
    const newImages = [...images];
    const foundIndex = findIndex(newImages, image => image.id === deletedId);

    if (foundIndex > -1) {
      const [data] = newImages.splice(foundIndex, 1);

      try {
        await deleteImage({ albumId: albumId, imageId: data.id });

        imageCacheService.deleteImage({ albumId: albumId, imageId: deletedId });

        setImages(newImages);
        setImagesCount(newImages.length);

        notification.success({
          message: formatMessage({ defaultMessage: 'Delete the image successfully!' }),
        });
      } catch (e) {
        console.log(e);

        notification.error({
          message: formatMessage({ defaultMessage: 'Delete the image failed!' }),
        });
      }
    }
  };

  const handleFileUploadComplete = ({ clientId, id, url }) => {
    setImages(prevImages => {
      return map(prevImages, img => {
        if (img.clientId === clientId) return { id, url };

        return img;
      });
    });

    setImagesCount(prev => prev + 1);

    imageCacheService.addImage(albumId, { id, url });
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

    albumCacheService.updateAlbum(updatedAlbum);
  };

  const handleAddAlbum = newAlbum => {
    albumCacheService.addAlbum(newAlbum);

    setImagesCount(0);
    setAlbumList([...albumList, { ...newAlbum }]);
    setCurrentAlbum(newAlbum);
    setLocalStorage(CURRENT_ALBUM_ID_KEY, newAlbum.id);
  };

  const handleDeleteAlbum = deletedAlbumId => {
    const updatedAlbumList = filter(albumList, alb => alb.id != deletedAlbumId);
    const updatedLength = updatedAlbumList.length;

    albumCacheService.deleteAlbum(deletedAlbumId);

    setAlbumList(updatedAlbumList);
    setCurrentAlbum(updatedAlbumList[updatedLength - 1]);
    setLocalStorage(CURRENT_ALBUM_ID_KEY, updatedAlbumList[updatedLength - 1]?.id);
  };

  const handleClickSelectAll = () => {
    if (isEmpty(images)) return;

    setIsSelectAll(!isSelectAll);
  };

  const handleClickReuploadAll = () => {
    setIsReUploadingAll(!isReuploadingAll);
    setIsSelectAll(false);
  };

  const handleClickDeleteAllImages = () => {
    let currentImages = [...images];

    setIsSelectAll(false);
    setIsDeleting(true);

    forEach(currentImages, async img => {
      try {
        await deleteImage({ albumId: albumId, imageId: img.id });

        imageCacheService.deleteImage({ albumId: albumId, imageId: img.id });
        currentImages = filter(currentImages, curImg => curImg.id !== img.id);

        setImagesCount(currentImages.length);
        setImages(currentImages);

        if (isEmpty(currentImages)) {
          setIsDeleting(false);

          notification.success({
            message: formatMessage({ defaultMessage: 'Delete all images successfully!' }),
          });
        }
      } catch (e) {
        console.log(e);

        setIsDeleting(false);

        notification.error({
          message: formatMessage({ defaultMessage: 'Delete all images failed!' }),
        });
      }
    });
  };

  const handleClickDownloadAllImages = async () => {
    let count = 0;
    setIsSelectAll(false);

    try {
      for (const img of images) {
        await downloadImageService(img);
        await new Promise(resolve => setTimeout(resolve, 500));

        count += 1;
      }

      if (count === imagesCount)
        notification.success({
          message: formatMessage({ defaultMessage: 'Download all images successfully!' }),
        });
    } catch (e) {
      console.log(e);

      notification.error({
        message: formatMessage({ defaultMessage: 'Download all images failed!' }),
      });
    }
  };

  useEffect(() => {
    if (albumId) {
      window.scrollTo(0, 0);

      setImagesCount(imagesSize);
      setIsSelectAll(false);
    }
  }, [albumId, imagesSize]);

  return (
    <Wrapper>
      <HeaderPage
        album={currentAlbum}
        albums={albumList}
        imagesCount={imagesCount}
        isSelectAll={isSelectAll}
        onAddAlbum={handleAddAlbum}
        onUpdateAlbum={handleUpdateAlbum}
        onDeleteAlbum={handleDeleteAlbum}
        onSelectAll={handleClickSelectAll}
        onReuploadAll={handleClickReuploadAll}
        onDeleteAllImages={handleClickDeleteAllImages}
        onDownloadAllImages={handleClickDownloadAllImages}
      />

      {!albumId ? (
        <EmptyAlbumPlaceholder />
      ) : (
        <GalleryImages
          images={images}
          albumId={albumId}
          isSelectAll={isSelectAll}
          isReuploadingAll={isReuploadingAll}
          isDeleting={isDeleting}
          onEnqueueUpload={enqueueUpload}
          onDelete={handleDeleteImages}
          onFilesAttached={handleImagesAttached}
          onFileUploadComplete={handleFileUploadComplete}
        />
      )}

      <ScrollButtons />

      <ListAlbums albums={albumList} onSelectedAlbumId={handleSetAlbumId} />
    </Wrapper>
  );
};
