import { find, findIndex } from 'lodash-es';
import { useEffect, useState } from 'react';

import { usePressKeyboard } from './use-press-keyboard.hook';

export const usePreviewImages = images => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState({});

  const handleImageClick = showId => {
    const imageToShow = find(images, img => img.id === showId);

    setPreviewImage(imageToShow);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  usePressKeyboard(
    event => {
      const currentIndex = findIndex(images, img => img.id === previewImage.id);

      if (event.key === 'ArrowRight' && currentIndex < images.length - 1) {
        setPreviewImage(images[currentIndex + 1]);
      } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
        setPreviewImage(images[currentIndex - 1]);
      } else if (event.key === 'Escape') {
        handleCloseModal();
      }
    },
    [images, previewImage],
  );

  useEffect(() => {
    if (previewImage && isOpen) {
      document.body.style.overflow = 'hidden';

      setIsOpen(true);
    }

    return () => {
      document.body.style.overflow = 'auto';

      setIsOpen(false);
    };
  }, [previewImage, isOpen]);

  return {
    isOpen,
    previewImage,
    onSelectImage: handleImageClick,
    onClosePreviewModal: handleCloseModal,
  };
};
