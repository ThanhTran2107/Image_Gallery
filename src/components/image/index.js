import { Image as BaseImage } from 'antd';

import { useDetectElementInViewport } from 'utilities/custom-hooks/use-detect-element-in-viewport.hook';

import { LAZY_LOAD_THRESH_HOLD } from './image.constant';

export const Image = ({ enableLazyLoad = false, lazyLoadThreshold = LAZY_LOAD_THRESH_HOLD, ...restProps }) => {
  const { targetRef, isVisible } = useDetectElementInViewport({
    enable: enableLazyLoad,
    threshold: lazyLoadThreshold,
  });

  return (
    <>
      {isVisible && <BaseImage {...restProps} />}
      {!isVisible && <div ref={targetRef} />}
    </>
  );
};
