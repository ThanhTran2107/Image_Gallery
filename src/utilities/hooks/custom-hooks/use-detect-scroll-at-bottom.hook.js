import { useEffect } from 'react';

export const useDetectScrollAtBottom = func => {
  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        document.body.scrollHeight - window.innerHeight <= Math.ceil(document.documentElement.scrollTop);

      if (isAtBottom) {
        func();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};
