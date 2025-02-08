import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export const ScrollButtons = () => {
  const [invisibleUp, setInvisibleUp] = useState(true);
  const [invisibleDown, setInvisibleDown] = useState(false);

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

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
