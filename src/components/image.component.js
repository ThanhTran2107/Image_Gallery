import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
// import { toast } from 'react-toastify';
import styled from 'styled-components';

import { useAddImage } from 'utilities/hooks/images/use-add-image.hook';

import { uploadImageService } from '../services/image';
import { Spinner } from './spinner.component';

const StyledImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const StyledImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 180ms cubic-bezier(0.25, 1, 0.5, 1);

  &:hover {
    transform: scale(1.05);

    .banner {
      display: flex;
    }
  }
`;

const Banner = styled.div`
  position: absolute;
  width: 100%;
  height: 35px;
  background: #726f6f75;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 9px 9px 0px 0px;

  display: none;
  justify-content: flex-end;
  align-items: center;
`;

const DeleteButton = styled.div`
  margin-right: 10px;
  cursor: pointer;
  color: #ffffff;

  &:hover {
    color: #ffc2c2;
  }
`;

export const ImageCard = ({ albumId, image, onSelectImage, onFileUploadComplete, onDelete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const addImages = useAddImage();

  const url = useMemo(() => image.url || URL.createObjectURL(image.file), [image]);

  useEffect(() => {
    if (image.file) {
      setIsUploading(true);

      uploadImageService(image.file).then(data => {
        const { url } = data.data.image;

        addImages(albumId, { url }).then(serverId => {
          onFileUploadComplete({ url: url, serverId, clientId: image.clientId });

          setIsUploading(false);
        });
      });
    }
  }, [image.file]);

  return (
    <StyledImageContainer>
      <StyledImage src={url} alt="Uploaded" className="image" onClick={() => onSelectImage(image.id)} />
      <Banner className="banner">
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
