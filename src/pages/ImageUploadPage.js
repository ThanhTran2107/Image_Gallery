import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { GalleryImages } from '../components/GalleryImages';
import { Spinner } from '../components/Spinner';
import { UploadImage } from '../components/UploadImage';

const StyledBackGround = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const getInitialUrls = () => {
  const images = JSON.parse(window.localStorage.getItem('images'));

  return images || [];
};

export const ImageUploadPage = () => {
  const [images, setImages] = useState(() => getInitialUrls());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && images.length > 0) {
      window.localStorage.setItem('images', JSON.stringify(images));
    }
  }, [isLoading, images]);

  const handleDeleteUrl = (deleteId) => {
    const newImages = images.filter((img) => img.id !== deleteId);

    setImages(newImages);
    window.localStorage.setItem('images', JSON.stringify(newImages));    
  };

  return (
    <StyledBackGround>
      <UploadImage onFileUploadComplete={setImages} onUploading={setIsLoading} />
      <GalleryImages images={images} onDelete={handleDeleteUrl} />
      {isLoading && <Spinner />}
    </StyledBackGround>
  );
};
