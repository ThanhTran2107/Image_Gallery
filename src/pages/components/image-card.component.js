import { faDownload, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS } from 'constant';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { useAddImage } from 'utilities/hooks/data-hooks/images/use-add-image.hook';

import { Image } from '../../components/image.component';
import { Spinner } from '../../components/spinner.component';

const StyledImage = styled(Image)`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 1rem;
`;

const StyledImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 180ms cubic-bezier(0.25, 1, 0.5, 1);
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  border: 0.1rem solid var(--border-image-color);

  &:hover {
    transform: scale(1.05);

    .banner {
      display: flex;
    }
  }

  @media only screen and (min-width: 768px) {
    .image {
      height: 25rem;
    }
    .banner {
      height: 3rem;
    }
  }

  @media only screen and (min-width: 1024px) {
    .image {
      height: 30rem;
    }
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
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 1rem 1rem 0 0;
  display: none;
  align-items: center;
  justify-content: flex-end;
  top: 0;
  gap: 1rem;
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

const StyledSpinner = styled(Spinner)`
  width: 8rem;
  height: 8rem;
`;

export const ImageCard = ({ albumId, image, onSelectImage, onFileUploadComplete, onDelete, enqueueUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const addImages = useAddImage();

  const url = useMemo(() => image.url || URL.createObjectURL(image.file), [image]);

  const handleDownloadImage = async () => {
    try {
      if (image) {
        const response = await fetch(image.url);

        if (response) {
          const blob = await response.blob();

          const url = URL.createObjectURL(blob);
          const fileName = image.url.split('/');

          const link = document.createElement('a');
          link.download = `image-${fileName[3]}.jpg`;
          link.href = url;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          URL.revokeObjectURL(url);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (image.file) {
          setIsUploading(true);

          const data = await enqueueUpload(image.file);

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
      <StyledImageContainer>
        <StyledImage src={url} alt="Uploaded" className="image" onClick={() => onSelectImage(image.id)} />

        <Banner className="banner">
          <DownloadButton icon={faDownload} onClick={handleDownloadImage} />
          <DeleteButton icon={faTrashCan} onClick={() => onDelete(image.id)} />
        </Banner>

        {isUploading && <StyledSpinner />}
      </StyledImageContainer>
    </>
  );
};

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
  onSelectImage: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  albumId: PropTypes.string.isRequired,
  onFileUploadComplete: PropTypes.func.isRequired,
};
