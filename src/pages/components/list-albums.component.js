import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import { Avatar } from 'components/avatar.component';
import { Button } from 'components/button.component';
import { Space } from 'components/space.component';

import { COLORS } from 'utilities/constant';

const Container = styled.div`
  position: fixed;
  width: 24rem;
  min-height: 100vh;
  background-color: var(--background-color);
  right: 0;
  transform: translateX(100%);
  transition: transform 0.5s;
  border: 0.1rem solid white;

  @media only screen and (min-width: 768px) {
    width: 44rem;
  }

  @media only screen and (min-width: 1024px) {
    width: 64rem;
  }

  &.is-show {
    transform: translateX(0);

    .album-list {
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background: var(--background-color);
  border-bottom: 0.1rem solid ${COLORS.FOG_GRAY};

  .header-text {
    display: flex;
    font-weight: bold;
    font-size: 1.2rem;

    @media only screen and (min-width: 768px) {
      font-size: 1.4rem;
    }

    @media only screen and (min-width: 1024px) {
      font-size: 1.6rem;
    }
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
  font-size: 1rem;

  @media only screen and (min-width: 768px) {
    font-size: 1.5rem;
  }

  @media only screen and (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const AlbumList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  position: fixed;
  right: 0;
  width: 24rem;
  padding: 1rem 0.5rem;
  opacity: 0;
  transition: opacity 0.5s;
  min-height: 20vh;
  max-height: 90vh;
  overflow: auto;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    width: 45rem;
    padding: 2.5rem 0.5rem;
  }

  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    width: 63rem;
    padding: 2.5rem 0.5rem;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;

  @media only screen and (min-width: 768px) {
    font-size: 1.2rem;
  }

  @media only screen and (min-width: 1024px) {
    font-size: 1.6rem;
  }
`;

const StyledImage = styled(Avatar)`
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  object-fit: cover;
  cursor: pointer;

  @media only screen and (min-width: 768px) {
    width: 12rem;
    height: 12rem;
  }

  @media only screen and (min-width: 1024px) {
    width: 16rem;
    height: 16rem;
  }

  &:hover {
    box-sizing: border-box;
    border: 0.4rem solid #ca077e;
  }
`;

const OpenButton = styled(Button)`
  display: flex;
  position: fixed;
  right: -3.2rem;
  top: 32rem;
  border: none;
  border-radius: 1rem 1rem 0 0;
  cursor: pointer;
  background-color: ${COLORS.DEEP_PINK};
  transform: rotate(270deg);
  width: 8rem;
  height: 2.2rem;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${COLORS.WHITE};
  font-size: 1.2rem;

  @media only screen and (min-width: 768px) {
    width: 10rem;
    height: 2.5rem;
    font-size: 1.5rem;
    right: -3.9 rem;
  }

  @media only screen and (min-width: 1024px) {
    width: 10rem;
    height: 2.5rem;
    font-size: 1.5rem;
    right: -4rem;
  }

  &:hover {
    background-color: ${COLORS.DARK_PINK} !important;
    color: ${COLORS.WHITE} !important;
  }
`;

export const ListAlbums = ({ albums, onSelectedAlbumId }) => {
  const [showAlbums, setShowAlbums] = useState(false);

  const { formatMessage } = useIntl();

  const handleOpenAlbum = () => setShowAlbums(true);

  const handleCloseAlbums = () => setShowAlbums(false);

  const albumsList = albums.map(({ avatar, id, name }) => (
    <Items className="item" key={id} onClick={() => onSelectedAlbumId(id)}>
      <Space direction="vertical" size="small" align="center">
        <StyledImage src={avatar} alt={name} />
        <p style={{ alignSelf: 'center' }}>{name}</p>
      </Space>
    </Items>
  ));

  return (
    <>
      <OpenButton onClick={handleOpenAlbum}>Albums</OpenButton>
      {showAlbums && <BackDrop onClick={handleCloseAlbums} />}

      <Container className={classNames({ 'is-show': showAlbums })} onClick={event => event.stopPropagation()}>
        <Header>
          <span className="header-text">{formatMessage({ defaultMessage: 'All Albums' })}</span>
          <CloseButton icon={faClose} onClick={handleCloseAlbums} />
        </Header>
        <AlbumList className="album-list">{albumsList}</AlbumList>
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
