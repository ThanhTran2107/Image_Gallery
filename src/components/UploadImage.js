import styled from 'styled-components';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { uploadImageService } from '../services/image';
import { isValidImageSize } from '../services/isValidImageSize';

const StyledTitle = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #bf4f74;
  margin-top: -50px;
`;

export const UploadImage = ({ onFileUploadComplete, onUploading }) => {
  const [files, setFiles] = useState([]);

  const getValidationImagesError = files => {
    if(files.length > 5){
      return 'You can upload only 5 images at a time !';
    }

    const largeFilesName = files.filter(file => !isValidImageSize(file)).map(file => file.name);

    if(largeFilesName.length > 0){
      return `${largeFilesName.join(' , ')} too large. Max allowed size is 1.5MB !`;
    }
  }

  const handleImageValidation = (event) => {
    const { files } = event.target;
    const selectedFiles = Array.from(files);

    const errorMessage = getValidationImagesError(selectedFiles);

    if(errorMessage){
      toast.error(errorMessage);
      document.getElementById('file').value = '';
      
      return;
    }
    
    setFiles(selectedFiles);
  }

  const handleUploadImage = async () => {
    let countOfUploadedFiles = 0;

    if(files.length === 0){
      toast.error('There are no any files to upload!');

      return;
    }

    onUploading(true);

    files.forEach(file => {
      uploadImageService(file).then((data) => {
        const { url } = data.data.image;

        if(url){
          const imageId = uuidv4();
          onFileUploadComplete(prevState => ([...prevState, { id: imageId, url }]));
        }
        
        countOfUploadedFiles += 1;

        if(countOfUploadedFiles === files.length){
          onUploading(false);

          toast.success('All images uploaded successfully !');
          document.getElementById('file').value = '';
          setFiles([]);
        }
      });
    });
  };

  return (
    <div>
      <StyledTitle>Upload Image</StyledTitle>
      <input onChange={handleImageValidation} type="file" id="file" multiple /><br />
      <button onClick={handleUploadImage}>Upload</button>
      <br />
    </div>
  );
};

UploadImage.propTypes = {
  onFileUploadComplete: PropTypes.func.isRequired,
  onUploading: PropTypes.func.isRequired,
};