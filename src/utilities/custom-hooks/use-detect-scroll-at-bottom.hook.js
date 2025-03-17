import { useEffect } from 'react';

import { isScrolledNearBottom } from 'utilities/services/dom';

export const useDetectScrollAtBottom = ({ func, isDisabled, threshold = 0 }) => {
  useEffect(() => {
    const handleScroll = () => {
      if (!isDisabled && isScrolledNearBottom(threshold)) func().then(() => console.log('Processed!'));
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [func]);
};
