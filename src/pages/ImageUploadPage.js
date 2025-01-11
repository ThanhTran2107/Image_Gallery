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
  const urls = JSON.parse(window.localStorage.getItem('urls'));

  return urls || [];
};

export const ImageUploadPage = () => {
  const [urls, setUrls] = useState(() => getInitialUrls());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && urls.length > 0) {
      window.localStorage.setItem('urls', JSON.stringify(urls));
    }
  }, [isLoading, urls]);

  const handleDeleteUrl = (deleteId) => {
    const newUrls = urls.filter((url) => url.id !== deleteId);

    setUrls(newUrls);
    window.localStorage.setItem('urls', JSON.stringify(newUrls));    
  };

  return (
    <StyledBackGround>
      <UploadImage onFileUploadComplete={setUrls} onUploading={setIsLoading} />
      <GalleryImages urls={urls} onDelete={handleDeleteUrl} />
      {isLoading && <Spinner />}
    </StyledBackGround>
  );
};
