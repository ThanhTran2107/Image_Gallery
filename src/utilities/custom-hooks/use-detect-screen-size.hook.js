import { useEffect, useRef, useState } from 'react';

export const useDetectScreenSize = options => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const timeoutRef = useRef();
  const { delay = 500 } = options || {};

  useEffect(() => {
    const checkScreenSize = () => {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        if (window.innerWidth < 768) {
          setIsMobile(true);
        } else if (window.innerWidth > 1024) {
          setIsDesktop(true);
        } else {
          setIsTablet(true);
        }
      }, delay);
    };

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    isMobile,
    isDesktop,
    isTablet,
  };
};
