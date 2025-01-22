import { find, findIndex, isEmpty, map } from 'lodash-es';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { GalleryImages } from 'components/gallery-images.component';
import { HeaderPage } from 'components/header.component';
import { ListAlbums } from 'components/list-albums.component';
import { ScrollButtons } from 'components/scroll-buttons.component';

import { useGetAlbums } from 'utilities/hooks/albums/use-get-albums.hook';
import { useDeleteImage } from 'utilities/hooks/images/use-delete-image.hook';
import { useGetImages } from 'utilities/hooks/images/use-get-images.hook';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

export const ImageListingPage = () => {
  const [images, setImages] = useState([]);
  const [albumsList, setAlbumsList] = useState([]);
  const [album, setAlbum] = useState({});

  const getAlbums = useGetAlbums();
  const getImages = useGetImages();
  const deleteImage = useDeleteImage();
  const albumId = album.id;

  const handleDeleteImages = deleteId => {
    const newImages = [...images];
    const foundIndex = findIndex(newImages, image => image.id === deleteId);

    if (foundIndex > -1) {
      const [data] = newImages.splice(foundIndex, 1);

      setImages(newImages);
      deleteImage(albumId, data.id);
    }
  };

  const handleFileUploadComplete = ({ clientId, serverId, url }) => {
    setImages(prevImages => {
      return map(prevImages, img => {
        if (img.clientId === clientId) return { clientId, serverId, url };

        return img;
      });
    });
  };

  const handleImagesAttached = data => setImages([...data, ...images]);

  const handleSetAlbumId = selectedId => {
    const selectedAlbum = find(ListAlbums, alb => alb.id === selectedId);

    setAlbum(selectedAlbum);
  };

  useEffect(() => {
    (async () => {
      try {
        const albums = await getAlbums();

        if (!isEmpty(albums)) {
          const currentAlbumId = window.localStorage.getItem('currentAlbumId');

          const currentAlbum = find(albums, alb => alb.id === currentAlbumId);

          setAlbumsList(albums);
          !isEmpty(currentAlbum) && setAlbum(currentAlbum);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (albumId) {
          const images = await getImages(albumId);

          window.localStorage.setItem('currentAlbumId', albumId);
          setImages(images);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [albumId]);

  return (
    <Wrapper>
      <HeaderPage album={album} />
      <GalleryImages
        images={images}
        onDelete={handleDeleteImages}
        onFilesAttached={handleImagesAttached}
        onFileUploadComplete={handleFileUploadComplete}
        albumId={albumId}
      />
      <ScrollButtons />
      <ListAlbums albums={albumsList} onSelectedAlbumId={handleSetAlbumId} />
    </Wrapper>
  );
};
