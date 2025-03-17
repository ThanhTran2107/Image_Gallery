import { useEffect } from 'react';

import { isNonScrollable } from 'utilities/services/dom';

export const useDetectNoScrollBar = ({ func, isDisabled }) => {
  useEffect(() => {
    if (!isDisabled && isNonScrollable()) func().then(() => console.log('Processed!'));
  }, [func]);
};
