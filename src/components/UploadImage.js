import { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { uploadImageService } from '../services/image';

const StyledTitle = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #bf4f74;
  margin-top: -50px;
`;

export const UploadImage = ({ onFileUploadComplete, onUploading }) => {
  const count = useRef(0);

  const handleUploadImage = async () => {
    const { files } = document.getElementById('file');

    if (files.length === 0) {
      alert('There is no any files to upload!');

      return;
    }

    if(files.length > 0){
      onUploading(true);

      Array.from(files).forEach((file) => {
        uploadImageService(file).then((data) => {
        const { url } = data.data.image;

        if(url){
          const imageId = uuidv4();
          
          onFileUploadComplete( prevState => {
              return [...prevState, { id: imageId, url }];
          });
        }
        
        count.current += 1;

        if(count.current === files.length){
          onUploading(false);

          document.getElementById('file').value = '';
          count.current = 0;
        }
        });
      });
    }
  };

  return (
    <div>
      <StyledTitle>Upload Image</StyledTitle>
      <input type="file" id="file" multiple />
      <br />
      <button onClick={handleUploadImage}>Upload</button>
      <br />
    </div>
  );
};

UploadImage.propTypes = {
  onFileUploadComplete: PropTypes.func.isRequired,
  onUploading: PropTypes.func.isRequired,
};