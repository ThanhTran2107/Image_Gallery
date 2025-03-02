import { forEach } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

export const useDetectElementInViewport = ({ rootMargin, threshold }) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        forEach(entries, entry => {
          if (entry.isIntersecting) setIsVisible(true);
        }),
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      if (targetRef.current && isVisible) observer.unobserve(targetRef.current);
    };
  }, [targetRef.current, isVisible]);

  return { targetRef, isVisible };
};
