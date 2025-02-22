import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { notification } from 'components/notification.component';

import { COLORS } from 'utilities/constant';

import { isValidImageSize } from '../utilities/services/isValidImageSize';
import { Button } from './button.component';

const UploadButton = styled(Button)`
  width: 100%;
  height: 20rem;
  border-radius: 1rem;
  border: 0.1rem solid var(--border-upload-button-color);
  background-color: ${COLORS.DARK_GRAY};
  cursor: pointer;
  transition: transform 180ms cubic-bezier(0.25, 1, 0.5, 1);

  &:hover {
    background-color: ${COLORS.DARK_GRAY} !important;
    transform: scale(1.05);

    .icon {
      transform: scale(1.05);
    }
  }

  @media only screen and (min-width: 768px) {
    height: 25rem;
  }

  @media only screen and (min-width: 1024px) {
    height: 30rem;
  }
`;

export const ImageUploaderTool = ({ onFilesAttached }) => {
  const { t } = useTranslation();

  const handleOpenDialogFile = () => document.getElementById('file').click();

  const getValidationImagesError = files => {
    if (files.length > 200) {
      return t('validate_files_length');
    }

    const largeFilesName = files
      .filter(file => !isValidImageSize(file))
      .map(file => file.name)
      .filter(name => name !== null);

    if (!largeFilesName) {
      return `${largeFilesName.join(', ')} ${t('validate_files_size')}`;
    }
  };

  const handleImageValidation = event => {
    const { files } = event.target;
    const selectedFiles = Array.from(files);

    if (selectedFiles.length === 0) {
      return;
    }

    const errorMessage = getValidationImagesError(selectedFiles);

    if (errorMessage) {
      notification.error({ message: errorMessage });

      return;
    }

    const updatedFiles = selectedFiles.map(file => ({
      clientId: uuidv4(),
      file,
    }));

    onFilesAttached(updatedFiles);
  };

  return (
    <UploadButton onClick={handleOpenDialogFile}>
      <input onChange={handleImageValidation} type="file" id="file" multiple style={{ display: 'none' }} />
      <FontAwesomeIcon className="icon" icon={faPlus} style={{ width: '40px', height: '40px', color: COLORS.WHITE }} />
    </UploadButton>
  );
};

ImageUploaderTool.propTypes = {
  onFilesAttached: PropTypes.func.isRequired,
};
