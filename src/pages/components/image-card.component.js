import { faDownload, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Image } from 'components/image';
import { Skeleton } from 'components/skeleton.component';

import { COLORS } from 'utilities/constant';
import { useAddImage } from 'utilities/data-hooks/images/use-add-image.hook';
import { downloadImageService } from 'utilities/services/image';

const StyledImage = styled(Image)`
  border-radius: 1rem;
  object-fit: cover;
  aspect-ratio: 1/1;
`;

const StyledSkeleton = styled(Skeleton.Image)`
  width: 100% !important;
  height: 100% !important;
  aspect-ratio: 1/1;
`;

const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.05);

    .banner {
      display: flex;
    }
  }

  @media only screen and (min-width: 768px) {
    .banner {
      height: 3rem;
    }
  }

  @media only screen and (min-width: 1024px) {
    .banner {
      height: 4rem;
    }
  }
`;

const Banner = styled.div`
  position: absolute;
  width: 100%;
  height: 2rem;
  background-color: ${COLORS.FOG_GRAY};
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 1rem 1rem 0 0;
  display: none;
  align-items: center;
  justify-content: flex-end;
  top: 0;
  gap: 0.5rem;

  @media only screen and (min-width: 768px) {
    font-size: 1.3rem;
    gap: 0.8rem;
  }

  @media only screen and (min-width: 1024px) {
    font-size: 1.5rem;
    gap: 1rem;
  }
`;

const DeleteButton = styled(FontAwesomeIcon)`
  padding: 1rem;
  cursor: pointer;
  color: ${COLORS.WHITE};

  &:hover {
    transform: scale(1.2);
  }
`;

const DownloadButton = styled(FontAwesomeIcon)`
  border: none;
  background-color: transparent;
  color: ${COLORS.WHITE};
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

export const ImageCard = ({ albumId, image, onSelectImage, onFileUploadComplete, onDelete, onEnqueueUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const addImages = useAddImage();

  const url = useMemo(() => image.url || URL.createObjectURL(image.file), [image]);

  const handleDownloadImage = () => downloadImageService(image);

  useEffect(() => {
    (async () => {
      try {
        if (image.file) {
          setIsUploading(true);

          const data = await onEnqueueUpload(image.file);

          const { url } = data.data.image;

          const id = await addImages(albumId, { url });

          onFileUploadComplete({ url, id, clientId: image.clientId });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsUploading(false);
      }
    })();
  }, [image.file]);

  return (
    <>
      {isUploading ? (
        <StyledSkeleton loading={isUploading} active={isUploading} />
      ) : (
        <StyledImageContainer>
          <StyledImage
            placeholder={<StyledSkeleton active loading />}
            preview={false}
            src={url}
            alt="Uploaded"
            className="image"
            onClick={() => onSelectImage(image.id)}
          />
          <Banner className="banner">
            <DownloadButton icon={faDownload} onClick={handleDownloadImage} />
            <DeleteButton icon={faTrashCan} onClick={() => onDelete(image.id)} />
          </Banner>
        </StyledImageContainer>
      )}
    </>
  );
};

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
  onSelectImage: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  albumId: PropTypes.string.isRequired,
  onFileUploadComplete: PropTypes.func.isRequired,
  onEnqueueUpload: PropTypes.func.isRequired,
};
