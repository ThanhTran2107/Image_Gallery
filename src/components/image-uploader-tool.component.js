import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { notification } from 'components/notification.component';

import { COLORS } from 'utilities/constant';
import { MAX_FILE_LENGTH, MAX_FILE_SIZE_MB } from 'utilities/constant';

import { isValidImageSize } from '../utilities/services/isValidImageSize';
import { Button } from './button.component';

const UploadButton = styled(Button)`
  width: 100%;
  height: auto;
  border-radius: 1rem;
  border: 0.1rem solid var(--border-upload-button-color);
  background-color: ${COLORS.DARK_GRAY};
  cursor: pointer;
  transition: transform 180ms cubic-bezier(0.25, 1, 0.5, 1);
  aspect-ratio: 1;

  &:hover {
    background-color: ${COLORS.DARK_GRAY} !important;
    transform: scale(1.05);

    .icon {
      transform: scale(1.05);
    }
  }
`;

export const ImageUploaderTool = ({ onFilesAttached }) => {
  const { formatMessage } = useIntl();

  const handleOpenDialogFile = () => document.getElementById('file').click();

  const getValidationImagesError = files => {
    if (files.length > MAX_FILE_LENGTH) {
      return formatMessage({
        defaultMessage: 'You can upload only {maxLength} images at a time!',
        values: { maxLength: MAX_FILE_LENGTH },
      });
    }

    const largeFilesName = files
      .filter(file => !isValidImageSize(file))
      .map(file => file.name)
      .filter(name => name !== null);

    if (!largeFilesName) {
      return `${largeFilesName.join(', ')} ${formatMessage({
        defaultMessage: 'Too large. Max allowed {maxSize} is 10 MB!',
        values: { maxSize: MAX_FILE_SIZE_MB },
      })}`;
    }
  };

  const handleImageValidation = event => {
    const { files } = event.target;
    const selectedFiles = Array.from(files);

    if (isEmpty(selectedFiles)) return;

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
