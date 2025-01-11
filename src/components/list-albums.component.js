import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  width: 550px;
  height: 750px;
  border: none;
  background-color: #ffffff00;
  right: 0px;
  transform: translateX(110%);
  transition: transform 0.5s;

  &.is-show {
    transform: translateX(0);
  }
`;

const ListContainer = styled.div`
  position: fixed;
  width: 600px;
  height: 750px;
  border: none;
  background-color: white;
  right: 600px;
  transform: translateX(100%);
  transition: transform 0.5s;
  overflow: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  background: #8f878736;

  .header-text {
    display: flex;
    margin-left: 20px;
    color: black;
    font-weight: bold;
    font-size: 20px;
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
  margin-top: 350px;
  margin-left: -111px;
  border: none;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  background: #ca077e;
  transform: rotate(270deg);
  transform-origin: center;
  width: 90px;
  height: 30px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  font-size: 17px;
  color: white;

  &:hover {
    background: #87155a;
  }

  &.is-show {
    display: none;
  }
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

  p {
    color: black;
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
      <Container className={classNames({ 'is-show': showAlbums })}>
        <ListContainer className="list-container" onClick={event => event.stopPropagation()}>
          <Header>
            <span className="header-text">All Albums</span>
          </Header>
          <AlbumList>{albumsList}</AlbumList>
        </ListContainer>

        <CloseButton onClick={handleCloseAlbums} className={classNames({ 'is-show': !showAlbums })}>
          Close
        </CloseButton>
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
