import { find, findIndex } from 'lodash-es';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ImageUploaderTool } from './image-uploader-tool.component';
import { ImageCard } from './image.component';

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  padding: 16px;
  justify-content: center;
`;

const PreviewImageModal = styled.div`
  display: flex;
  position: fixed;
  overflow: hidden !important;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0 0 0 / 55%);
  justify-content: center;
`;

const PreviewImage = styled.img`
  position: absolute;
  margin: auto;
  display: block;
  width: 100;
  height: 100vh;
`;

export const GalleryImages = ({ images, albumId, onDelete, onFilesAttached, onFileUploadComplete }) => {
  const [showImage, setShowImage] = useState(false);

  const handleImageClick = showId => {
    const imageToShow = find(images, img => img.id === showId);

    setShowImage(imageToShow);
  };

  const handleCloseModal = () => {
    setShowImage(false);
  };

  const sendImageToImageComponent = images.map(img => (
    <ImageCard
      key={img.clientId || img.id}
      image={img}
      albumId={albumId}
      onDelete={onDelete}
      onFileUploadComplete={onFileUploadComplete}
      onSelectImage={handleImageClick}
    />
  ));

  useEffect(() => {
    const handleKeyDown = event => {
      const currentIndex = findIndex(images, img => img.id === showImage.id);

      if (event.key === 'ArrowRight' && currentIndex < images.length - 1) {
        setShowImage(images[currentIndex + 1]);
      } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
        setShowImage(images[currentIndex - 1]);
      } else if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [images, showImage]);

  useEffect(() => {
    if (showImage) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showImage]);

  return (
    <>
      <GalleryWrapper>
        <ImageUploaderTool onFilesAttached={onFilesAttached} />
        {sendImageToImageComponent}
      </GalleryWrapper>

      {showImage && (
        <>
          <PreviewImageModal onClick={handleCloseModal}>
            <PreviewImage
              src={showImage.url}
              alt="Uploaded"
              className="show-image"
              onClick={event => event.stopPropagation()}
            />
          </PreviewImageModal>
        </>
      )}
    </>
  );
};

GalleryImages.propTypes = {
  albumId: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
  onDelete: PropTypes.func.isRequired,
  onFileUploadComplete: PropTypes.func.isRequired,
  onFilesAttached: PropTypes.func.isRequired,
};
