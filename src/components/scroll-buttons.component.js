import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS } from 'constant';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button } from './button.component';

const StyledButton = styled(Button)`
  position: fixed;
  right: 2rem;
  border-radius: 100%;
  width: 5rem;
  height: 5rem;
  border: none;
  background-color: ${COLORS.BRIGHT_BLUE};
  font-size: 1.5rem;
  color: ${COLORS.WHITE};
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
    background-color: ${COLORS.BLUE} !important;
    color: ${COLORS.WHITE} !important;
  }
`;

const ArrowUpButton = styled(StyledButton)`
  bottom: 10rem;
`;

const ArrowDownButton = styled(StyledButton)`
  bottom: 2rem;
`;

export const ScrollButtons = () => {
  const [invisibleUp, setInvisibleUp] = useState(true);
  const [invisibleDown, setInvisibleDown] = useState(false);

  const handleScrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleScrollDown = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

  useEffect(() => {
    const handleScroll = event => {
      if (event.target.documentElement.scrollTop > 300) {
        setInvisibleUp(false);
      } else {
        setInvisibleUp(true);
      }

      if (document.body.scrollHeight - window.innerHeight - Math.ceil(event.target.documentElement.scrollTop) > 300) {
        setInvisibleDown(false);
      } else {
        setInvisibleDown(true);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {!invisibleUp && (
        <>
          <ArrowUpButton className="btn-scroll-up" onClick={handleScrollUp}>
            <FontAwesomeIcon icon={faArrowUp} className="arrow-up" />
          </ArrowUpButton>
        </>
      )}
      {!invisibleDown && (
        <>
          <ArrowDownButton className="btn-scroll-down" onClick={handleScrollDown}>
            <FontAwesomeIcon icon={faArrowDown} className="arrow-down" />
          </ArrowDownButton>
        </>
      )}
    </div>
  );
};
