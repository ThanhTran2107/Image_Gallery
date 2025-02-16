import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { COLORS } from 'constant';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';

import { Avatar } from '../../components/avatar.component';
import { Button } from '../../components/button.component';

const Container = styled.div`
  position: fixed;
  width: 64rem;
  min-height: 100vh;
  background-color: var(--background-color);
  right: 0;
  transform: translateX(100%);
  transition: transform 0.5s;
  border: 0.1rem solid white;
  overflow: auto;

  &.is-show {
    transform: translateX(0);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding: 2rem;

  .header-text {
    display: flex;
    font-weight: bold;
    font-size: 1.6rem;
  }
`;

const BackDrop = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${COLORS.BLACK_55};
  justify-content: center;
`;

const CloseButton = styled(FontAwesomeIcon)`
  display: flex;
  border: none;
  cursor: pointer;
  font-size: 2rem;
`;

const AlbumList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: absolute;
  width: 62rem;
  padding: 2rem 0.5rem;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1.6rem;
`;

const StyledImage = styled(Avatar)`
  width: 16rem;
  height: 16rem;
  border-radius: 100%;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    box-sizing: border-box;
    border: 0.4rem solid #ca077e;
  }
`;

const OpenButton = styled(Button)`
  display: flex;
  position: fixed;
  right: -4rem;
  top: 32rem;
  border: none;
  border-radius: 1rem 1rem 0 0;
  cursor: pointer;
  background-color: ${COLORS.DEEP_PINK};
  transform: rotate(270deg);
  width: 10rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${COLORS.WHITE};
  font-size: 1.2rem;

  &:hover {
    background-color: ${COLORS.DARK_PINK} !important;
    color: ${COLORS.WHITE} !important;
  }
`;

export const ListAlbums = ({ albums, onSelectedAlbumId }) => {
  const [showAlbums, setShowAlbums] = useState(false);

  const handleOpenAlbum = () => setShowAlbums(true);

  const handleCloseAlbums = () => setShowAlbums(false);

  const albumsList = albums.map(({ avatar, id, name }) => (
    <Items className="item" key={id} onClick={() => onSelectedAlbumId(id)}>
      <StyledImage src={avatar} alt={name} />
      <p>{name}</p>
    </Items>
  ));

  return (
    <>
      <OpenButton onClick={handleOpenAlbum}>All Albums</OpenButton>
      {showAlbums && <BackDrop onClick={handleCloseAlbums} />}

      <Container className={classNames({ 'is-show': showAlbums })} onClick={event => event.stopPropagation()}>
        <Header>
          <span className="header-text">All Albums</span>
          <CloseButton icon={faClose} onClick={handleCloseAlbums} />
        </Header>

        <AlbumList>{albumsList}</AlbumList>
      </Container>
    </>
  );
};

ListAlbums.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSelectedAlbumId: PropTypes.func.isRequired,
};
