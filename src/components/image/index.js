import { Image as BaseImage } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { useDetectElementInViewport } from 'utilities/custom-hooks/use-detect-element-in-viewport.hook';

import { LAZY_LOAD_CONFIG } from './image.constant';

const { ROOT_MARGIN, THRESHOLD } = LAZY_LOAD_CONFIG;

const LAZY_LOAD_OPTIONS = Object.freeze({
  rootMargin: ROOT_MARGIN,
  threshold: THRESHOLD,
});

export const Image = ({ options, className, ...restProps }) => {
  const newOptions = { ...LAZY_LOAD_OPTIONS, ...options };

  const { targetRef, isVisible } = useDetectElementInViewport(newOptions);

  if (isVisible) return <BaseImage className={className} {...restProps} />;

  return <div ref={targetRef} className={classNames(className, 'lazy-load-container')} />;
};

Image.PropTypes = {
  options: PropTypes.shape({
    rootMargin: PropTypes.string,
    threshold: PropTypes.number,
  }),
};
