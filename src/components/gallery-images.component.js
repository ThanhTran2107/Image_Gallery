import { map } from 'lodash-es';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { usePreviewImages } from 'utilities/hooks/custom-hooks/use-preview-images.hook';

import { ImageUploaderTool } from './image-uploader-tool.component';
import { ImageCard } from './image.component';

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 16px;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
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
  const { isOpen, previewImage, onSelectImage, onClosePreviewModal } = usePreviewImages(images);

  const sendImageToImageComponent = map(images, img => (
    <ImageCard
      key={img.clientId || img.id}
      image={img}
      albumId={albumId}
      onDelete={onDelete}
      onFileUploadComplete={onFileUploadComplete}
      onSelectImage={onSelectImage}
    />
  ));

  return (
    <>
      <GalleryWrapper>
        <ImageUploaderTool onFilesAttached={onFilesAttached} />
        {sendImageToImageComponent}
      </GalleryWrapper>

      {isOpen && (
        <>
          <PreviewImageModal onClick={onClosePreviewModal}>
            <PreviewImage
              src={previewImage.url}
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
