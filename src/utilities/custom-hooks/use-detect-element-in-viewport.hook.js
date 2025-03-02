import { useEffect, useRef, useState } from 'react';

export const useDetectElementInViewport = ({ enable, threshold = '0px' }) => {
  const [isVisible, setIsVisible] = useState(!enable);
  const targetRef = useRef(null);

  useEffect(() => {
    let observer = null;

    const option = {
      root: null,
      rootMargin: threshold,
      threshold: 0,
    };

    if (enable && !isVisible && targetRef.current) {
      observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), option);

      observer.observe(targetRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [targetRef.current, threshold, isVisible, enable]);

  return { isVisible, targetRef };
};
