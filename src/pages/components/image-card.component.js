import { LoadingOutlined } from '@ant-design/icons';
import { faDownload, faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Image } from 'components/image';
import { Skeleton } from 'components/skeleton.component';
import { Spin } from 'components/spin.component';

import { COLORS } from 'utilities/constant';
import { useAddImage } from 'utilities/data-hooks/images/use-add-image.hook';
import { downloadImageService } from 'utilities/services/image';

const StyledImage = styled(Image)`
  border-radius: 1rem;
  object-fit: cover;
  aspect-ratio: 1;

  &.is-selected {
    width: 70%;
    display: block;
    margin: auto;
  }
`;

const SelectedImage = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  border-radius: 1rem;
  aspect-ratio: 1;
  background: ${COLORS.DARK_GRAY};
  display: none;
  justify-content: flex-end;

  &.is-selected {
    display: flex;
  }
`;

const ErrorIcon = styled(FontAwesomeIcon)`
  position: absolute;
  margin-bottom: 25rem;
  margin-left: 25rem;
  font-size: 2rem;
  color: ${COLORS.CYBER_YELLOW};
`;

const StyledSkeleton = styled(Skeleton.Image)`
  width: 100% !important;
  height: 100% !important;
  aspect-ratio: 1;
`;

const StyledImageContainer = styled.div`
  border-radius: 1rem;
  border: 0.1rem solid var(--border-image-color);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  transition: transform 180ms cubic-bezier(0.25, 1, 0.5, 1);

  &:hover {
    transform: scale(1.05);

    .banner {
      display: flex;
    }
  }

  &.is-selected {
    .banner {
      display: none;
    }
  }

  &.is-error {
    .banner {
      display: none;
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

const StyledSpinner = styled(Spin)`
  position: absolute;
`;

export const ImageCard = ({
  albumId,
  image,
  isSelectAll,
  isReuploadingAll,
  onSelectImage,
  onFileUploadComplete,
  onDelete,
  onEnqueueUpload,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadError, setIsUploadError] = useState(false);

  const { mutateAsync: addImage } = useAddImage();

  const srcUrl = useMemo(() => image.url || URL.createObjectURL(image.file), [image]);

  const handleDownloadImage = () => downloadImageService(image);

  useEffect(() => {
    (async () => {
      try {
        if (image.file) {
          setIsUploadError(false);
          setIsUploading(true);

          const data = await onEnqueueUpload(image.file);

          const { url } = data.data.image;

          const id = await addImage({ albumId: albumId, data: { url } });

          onFileUploadComplete({ url, id, clientId: image.clientId });
        }
      } catch (e) {
        console.log(e);

        setIsUploadError(true);
      } finally {
        setIsUploading(false);
      }
    })();
  }, [image.file, isReuploadingAll]);

  return (
    <StyledImageContainer className={classNames({ 'is-selected': isSelectAll, 'is-error': isUploadError })}>
      {isSelectAll && <SelectedImage className={classNames({ 'is-selected': isSelectAll })} />}

      <StyledImage
        placeholder={<StyledSkeleton active loading />}
        preview={false}
        src={srcUrl}
        alt="Uploaded"
        className={classNames('image', { 'is-selected': isSelectAll })}
        onClick={() => onSelectImage(image.id)}
      />

      <Banner className="banner">
        <DownloadButton icon={faDownload} onClick={handleDownloadImage} />
        <DeleteButton icon={faTrashCan} onClick={() => onDelete(image.id)} />
      </Banner>

      {isUploadError && <ErrorIcon icon={faTriangleExclamation} className="error-icon" />}

      {isUploading && (
        <StyledSpinner indicator={<LoadingOutlined style={{ fontSize: '5rem' }} spin />} className="spin" />
      )}
    </StyledImageContainer>
  );
};

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
  isSelectAll: PropTypes.bool,
  isReuploadingAll: PropTypes.bool,
  onReuploadAll: PropTypes.func.isRequired,
  onSelectImage: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  albumId: PropTypes.string.isRequired,
  onFileUploadComplete: PropTypes.func.isRequired,
  onEnqueueUpload: PropTypes.func.isRequired,
};
