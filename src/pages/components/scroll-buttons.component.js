import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button } from 'components/button.component';

import { COLORS } from 'utilities/constant';
import { isScrolledNearBottom, isScrolledNearTop } from 'utilities/services/dom';

const StyledButton = styled(Button)`
  position: fixed;
  right: 2rem;
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
  border: none;
  background-color: ${COLORS.BRIGHT_BLUE};
  font-size: 1.5rem;
  color: ${COLORS.WHITE};
  cursor: pointer;
  transition: transform 0.3s;

  @media only screen and (min-width: 768px) {
    width: 5rem;
    height: 5rem;
  }

  @media only screen and (min-width: 1024px) {
    width: 5rem;
    height: 5rem;
  }

  &:hover {
    transform: scale(1.1);
    background-color: ${COLORS.BLUE} !important;
    color: ${COLORS.WHITE} !important;
  }
`;

const ArrowUpButton = styled(StyledButton)`
  bottom: 7rem;

  @media only screen and (min-width: 768px) {
    bottom: 10rem;
  }

  @media only screen and (min-width: 1024px) {
    bottom: 10rem;
  }
`;

const ArrowDownButton = styled(StyledButton)`
  bottom: 2rem;
`;

export const ScrollButtons = () => {
  const [invisibleUp, setInvisibleUp] = useState(false);
  const [invisibleDown, setInvisibleDown] = useState(false);

  const handleScrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleScrollDown = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

  useEffect(() => {
    const handleScroll = () => {
      setInvisibleUp(!isScrolledNearTop(300));

      setInvisibleDown(!isScrolledNearBottom(300));
    };

    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setInvisibleDown(!isScrolledNearBottom(300));
    });

    observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {invisibleUp && (
        <ArrowUpButton className="btn-scroll-up" onClick={handleScrollUp}>
          <FontAwesomeIcon icon={faArrowUp} className="arrow-up" />
        </ArrowUpButton>
      )}

      {invisibleDown && (
        <ArrowDownButton className="btn-scroll-down" onClick={handleScrollDown}>
          <FontAwesomeIcon icon={faArrowDown} className="arrow-down" />
        </ArrowDownButton>
      )}
    </div>
  );
};

ScrollButtons.PropTypes = {
  isScrollHeightChanged: PropTypes.bool,
};
