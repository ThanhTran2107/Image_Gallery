import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  width: 620px;
  min-height: 100vh;
  border: none;
  background-color: var(--background-color);
  right: 0px;
  transform: translateX(100%);
  transition: transform 0.5s;
  border: 1px solid white;
  overflow: auto;

  &.is-show {
    transform: translateX(0);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border-bottom: 1px solid white;
  padding: 0 10px;

  .header-text {
    display: flex;
    font-weight: bold;
    font-size: 20px;
    margin-left: 10px;
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
  background-color: rgb(0 0 0 / 55%);
  justify-content: center;
`;

const CloseButton = styled.button`
  display: flex;
  border: none;
  cursor: pointer;
  background: transparent;
  font-size: 15px;
`;

const AlbumList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: fixed;
  top: 100px;
  width: 600px;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    object-fit: cover;
    cursor: pointer;

    &:hover {
      box-sizing: border-box;
      border: 4px solid #ca077e;
    }
  }
`;

const OpenButton = styled.button`
  display: flex;
  position: fixed;
  right: -35px;
  top: 350px;
  border: none;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  background: #ca077e;
  transform: rotate(270deg);
  width: 100px;
  height: 30px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 12px;

  &:hover {
    background: #87155a;
  }
`;

export const ListAlbums = ({ albums, onSelectedAlbumId }) => {
  const [showAlbums, setShowAlbums] = useState(false);

  const handleOpenAlbum = () => setShowAlbums(true);

  const handleCloseAlbums = () => setShowAlbums(false);

  const albumsList = albums.map(({ avatar, id, name }) => (
    <Items className="item" key={id} onClick={() => onSelectedAlbumId(id)}>
      <img src={avatar} alt={name} />
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
          <CloseButton onClick={handleCloseAlbums}>
            <FontAwesomeIcon icon={faClose} />
          </CloseButton>
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
