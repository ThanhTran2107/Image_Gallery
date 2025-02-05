import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ArrowUpButton = styled.button`
  position: fixed;
  bottom: 110px;
  right: 20px;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  border: none;
  background-color: rgb(0 123 255);
  font-size: 20px;
  color: white;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
    background-color: rgb(15 75 139);
  }
`;

const ArrowDownButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 20px;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  border: none;
  background-color: rgb(0 123 255);
  font-size: 20px;
  color: white;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
    background-color: rgb(15 75 139);
  }
`;

export const ScrollButtons = ({ scrollHeightChanged }) => {
  const [invisibleUp, setInvisibleUp] = useState(true);
  const [invisibleDown, setInvisibleDown] = useState(false);

  const handleScrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleScrollDown = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

  useEffect(() => {
    const handleScroll = event => {
      if (event.target.documentElement.scrollTop >= 1000) {
        setInvisibleUp(false);
      } else {
        setInvisibleUp(true);
      }

      if (event.target.documentElement.scrollHeight - window.scrollY - window.innerHeight >= 1000) {
        setInvisibleDown(false);
      } else {
        setInvisibleDown(true);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollHeightChanged != document.documentElement.scrollHeight) {
      setInvisibleDown(false);
    } else {
      setInvisibleDown(true);
    }
  }, [scrollHeightChanged]);

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

ScrollButtons.propTypes = {
  scrollHeightChanged: PropTypes.number.isRequired,
};
