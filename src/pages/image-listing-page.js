import { find, findIndex, map } from 'lodash-es';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { GalleryImages } from 'components/gallery-images.component';
import { HeaderPage } from 'components/header.component';
import { ListAlbums } from 'components/list-albums.component';
import { ScrollButtons } from 'components/scroll-buttons.component';

import { useCachedAlbums } from 'utilities/hooks/custom-hooks/use-cached-albums.hook';
import { useDeleteImage } from 'utilities/hooks/images/use-delete-image.hook';
import { useGetImagesSize } from 'utilities/hooks/images/use-get-image-size.hook';
import { useGetImages } from 'utilities/hooks/images/use-get-images.hook';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 1536px;
  margin: 0 auto;
`;

export const ImageListingPage = () => {
  const [images, setImages] = useState([]);
  const [lastDocId, setLastDocId] = useState(null);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [scrollHeightChanged, setSCrollHeightChanged] = useState(0);
  const { currentAlbum, setCurrentAlbum, albumList, setAlbumList } = useCachedAlbums();

  const getImages = useGetImages();
  const deleteImage = useDeleteImage();
  const getImagesSize = useGetImagesSize();

  const albumId = currentAlbum.id;

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

  const fetchImages = async () => {
    if (!albumId || isLoadingImages) return;

    window.localStorage.setItem('currentAlbumId', albumId);

    setIsLoadingImages(true);

    try {
      getImagesSize(albumId)
        .then(size => {
          setTotalImages(size);

          getImages(albumId, lastDocId).then(response => {
            const totalFetchedImages = images.length + response.data.length;

            if (totalFetchedImages > size) {
              const remainingImages = size - images.length;

              setImages(prev => [...prev, ...response.data.slice(0, remainingImages)]);
              setLastDocId(response.lastDocId);
              setIsLoadingImages(false);
            } else {
              setImages(prev => [...prev, ...response.data]);
              setLastDocId(response.lastDocId);
              setIsLoadingImages(false);
              setSCrollHeightChanged(document.documentElement.scrollHeight);
            }
          });
        })
        .catch(e => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight && !isLoadingImages) {
        fetchImages();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastDocId]);

  useEffect(() => {
    setImages([]);
    setIsLoadingImages(false);
    fetchImages();
  }, [albumId]);

  return (
    <Wrapper>
      <HeaderPage album={currentAlbum} totalImages={totalImages} onUpdateAlbum={handleUpdateAlbum} />
      <GalleryImages
        images={images}
        onDelete={handleDeleteImages}
        onFilesAttached={handleImagesAttached}
        onFileUploadComplete={handleFileUploadComplete}
        albumId={albumId}
      />
      <ScrollButtons scrollHeightChanged={scrollHeightChanged} />
      <ListAlbums albums={albumList} onSelectedAlbumId={handleSetAlbumId} />
    </Wrapper>
  );
};
