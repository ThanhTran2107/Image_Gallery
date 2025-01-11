import { useEffect } from 'react';

export const usePressKeyboard = (func, deps) => {
  useEffect(() => {
    window.addEventListener('keydown', func);

    return () => {
      window.removeEventListener('keydown', func);
    };
  }, deps);
};
