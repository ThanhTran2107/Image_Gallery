import styled from 'styled-components';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import { uploadImageService } from '../services/image';
import { isValidImageSize } from '../services/isValidImageSize';
import { PreviewImages } from './PreviewImages';

const StyledTitle = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #bf4f74;
  margin-top: -50px;
`;

const StyledButton = styled.button`
  margin-top: 10px;
  margin-bottom: 120px;
`;

const StyledHr = styled.hr`
  margin-bottom: 30px;
  border: 1px solid black;
`;

const StyledNote = styled.p`
  font-size: 14px;
  margin-top: -170px;
  margin-bottom: 85px;
  text-align: center;
`;

export const UploadImage = ({ onFileUploadComplete, onUploading }) => {
  const [files, setFiles] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const getValidationImagesError = files => {
    if (files.length > 5) {
      return 'You can upload only 5 images at a time !';
    }

    const largeFilesName = files
      .filter(file => !isValidImageSize(file))
      .map(file => file.name)
      .filter(name => name !== null);

    if (!largeFilesName) {
      return `${largeFilesName.join(', ')} too large. Max allowed size is 10 MB !`;
    }
  };

  useEffect(() => {
    const errorMessage = getValidationImagesError(files);
    if (errorMessage) {
      toast.error(errorMessage);
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [files]);

  const handleImageValidation = event => {
    const { files } = event.target;
    const selectedFiles = Array.from(files);

    const updatedFiles = selectedFiles.map(file => ({
      id: uuidv4(),
      file,
      url: URL.createObjectURL(file),
    }));

    setFiles(updatedFiles);
  };

  const handleDeletePreviewImage = deleteId => {
    const updatedFiles = files.filter(file => file.id !== deleteId);

    setFiles(updatedFiles);

    if (updatedFiles.length === 0) {
      document.getElementById('file').value = '';

      return;
    }
  };

  const handleUploadImage = async () => {
    if (files.length === 0) {
      toast.error('There are no files to upload !');
      return;
    }

    onUploading(true);

    const uploadedPromises = files.map(file =>
      uploadImageService(file.file).then(data => {
        const { url } = data.data.image;
        if (url) {
          const imageId = uuidv4();

          onFileUploadComplete(prevState => [...prevState, { id: imageId, url }]);
        }
      }),
    );

    Promise.all(uploadedPromises).finally(() => {
      setFiles([]);
      document.getElementById('file').value = '';

      onUploading(false);
      toast.success('All images uploaded successfully !');
    });
  };

  return (
    <div>
      <StyledTitle>Upload Image</StyledTitle>
      <StyledHr id="custom-line" />
      <input onChange={handleImageValidation} type="file" id="file" multiple />
      <br />
      <StyledButton onClick={handleUploadImage} disabled={isButtonDisabled}>
        Upload
      </StyledButton>
      <StyledNote>
        <i>(*) You can preview your images here before uploading</i>
      </StyledNote>
      <PreviewImages images={files} onDelete={handleDeletePreviewImage} />
    </div>
  );
};

UploadImage.propTypes = {
  onFileUploadComplete: PropTypes.func.isRequired,
  onUploading: PropTypes.func.isRequired,
};
