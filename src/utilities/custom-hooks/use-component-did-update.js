import { useEffect, useRef } from 'react';

/**
 * Custom hook as an alternative of the React Lifecycle Method - componentDidUpdate
 *
 * @param {any} dependencies - The array of values that should be observed.
 * @param {any} effect - Effect will not run after the initial render. It will run when one of the dependencies values has changed.
 *
 */
export const useComponentDidUpdate = (effect, dependencies) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;

      return;
    }
    effect();
    // eslint-disable-next-line
  }, dependencies);
};
