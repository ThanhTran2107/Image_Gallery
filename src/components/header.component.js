import { faCloudDownload } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  padding: 16px;
`;

const InfoAlbum = styled.div`
  display: flex;
  gap: 10px;
`;

const AlbumName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;

  .album-name {
    font-size: 30px;
  }
`;

const Avatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 100%;
  cursor: pointer;
  object-fit: cover;
`;

const AvatarContainer = styled.div`
  display: flex;
  border-radius: 100%;

  .icon-upload-avatar {
    font-size: 25px;
    color: white;
  }

  &:hover {
    .back-drop {
      display: flex;
    }
    .icon-upload-avatar {
      display: flex;
    }
  }
`;

const EditButton = styled.button`
  display: flex;
  color: #6767ff;
  font-size: 25px;
  gap: 10px;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    color: blue;
  }
`;

const BackDrop = styled.div`
  display: none;
  background-color: rgb(0 0 0 / 55%);
  width: 160px;
  height: 160px;
  border-radius: 100%;
  margin-left: -160px;
  justify-content: center;
  align-items: center;
`;

export const HeaderPage = ({ album }) => {
  return (
    <Header>
      <InfoAlbum>
        <AvatarContainer>
          <Avatar className="album-avatar" src={album.avatar} alt={album.name} />
          <BackDrop className="back-drop">
            <FontAwesomeIcon className="icon-upload-avatar" icon={faCloudDownload} />
          </BackDrop>
        </AvatarContainer>

        <AlbumName>
          <span className="album-name">{album.name}</span>
          <EditButton>
            <FontAwesomeIcon className="icon-edit" icon={faEdit} />
            Edit
          </EditButton>
        </AlbumName>
      </InfoAlbum>
    </Header>
  );
};

HeaderPage.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};
