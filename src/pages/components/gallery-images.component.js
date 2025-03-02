import { map } from 'lodash-es';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ImageUploaderTool } from 'components/image-uploader-tool.component';

import { COLORS } from 'utilities/constant';
import { usePreviewImages } from 'utilities/custom-hooks/use-preview-images.hook';

import { ImageCard } from './image-card.component';

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
  padding: 1rem;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
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
  background-color: ${COLORS.BLACK_55};
  justify-content: center;
`;

const PreviewImage = styled.img`
  position: absolute;
  display: block;
  object-fit: cover;
  width: 30rem;
  height: 60vh;
  margin-top: 15rem;

  @media only screen and (min-width: 768px) {
    width: 50rem;
    height: 80vh;
    margin-top: 10rem;
  }

  @media only screen and (min-width: 1025px) {
    margin-top: 0rem;
    height: 100vh;
  }
`;

export const GalleryImages = ({
  images,
  albumId,
  onDelete,
  onFilesAttached,
  onFileUploadComplete,
  onEnqueueUpload,
}) => {
  const { isOpen, previewImage, onSelectImage, onClosePreviewModal } = usePreviewImages(images);

  const sendImageToImageComponent = map(images, img => (
    <ImageCard
      key={img.clientId || img.id}
      image={img}
      albumId={albumId}
      onDelete={onDelete}
      onFileUploadComplete={onFileUploadComplete}
      onSelectImage={onSelectImage}
      onEnqueueUpload={onEnqueueUpload}
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
  onEnqueueUpload: PropTypes.func.isRequired,
};
