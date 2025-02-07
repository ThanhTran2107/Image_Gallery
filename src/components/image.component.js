import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { useAddImage } from 'utilities/hooks/images/use-add-image.hook';

import { uploadImageService } from '../services/image';
import { Spinner } from './spinner.component';

const StyledImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  transition: transform 180ms cubic-bezier(0.25, 1, 0.5, 1);

  &:hover {
    transform: scale(1.05);

    .banner {
      display: flex;
    }
  }

  @media only screen and (min-width: 768px) {
    .image {
      height: 200px;
    }

    .banner {
      height: 25px;
    }
  }

  @media only screen and (min-width: 1024px) {
    .image {
      height: 300px;
    }

    .banner {
      height: 35px;
    }
  }
`;

const Banner = styled.div`
  position: absolute;
  bottom: 88.5%;
  width: 100%;
  height: 17.5px;
  background: #726f6f75;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 9px 9px 0px 0px;

  display: none;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const DeleteButton = styled.div`
  margin-right: 10px;
  cursor: pointer;
  color: #ffffff;

  &:hover {
    transform: scale(1.2);
  }
`;

const DownloadButton = styled.button`
  border: none;
  background: transparent;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

export const ImageCard = ({ albumId, image, onSelectImage, onFileUploadComplete, onDelete }) => {
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
    if (image.file) {
      setIsUploading(true);

      uploadImageService(image.file).then(data => {
        const { url } = data.data.image;

        addImages(albumId, { url }).then(id => {
          onFileUploadComplete({ url: url, id, clientId: image.clientId });

          setIsUploading(false);
        });
      });
    }
  }, [image.file]);

  return (
    <StyledImageContainer>
      <StyledImage src={url} alt="Uploaded" className="image" onClick={() => onSelectImage(image.id)} />
      <Banner className="banner">
        <DownloadButton onClick={handleDownloadImage}>
          <FontAwesomeIcon icon={faDownload} />
        </DownloadButton>

        <DeleteButton onClick={() => onDelete(image.id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </DeleteButton>
      </Banner>
      {isUploading && <Spinner />}
    </StyledImageContainer>
  );
};

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
  onSelectImage: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  albumId: PropTypes.string.isRequired,
  onFileUploadComplete: PropTypes.func.isRequired,
};
