import { faCloudDownload } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trim } from 'lodash-es';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { useUpdateAlbum } from 'utilities/hooks/albums/use-update-albums.hook';

import { uploadImageService } from '../services/image';
import { Spinner } from './spinner.component';

const Header = styled.div`
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: flex-end;

  @media only screen and (min-width: 768px) {
    .album-name {
      font-size: 25px;
    }

    .icon-upload-avatar {
      font-size: 20px;
      color: white;
    }

    .back-drop {
      width: 120px;
      height: 120px;
    }

    .album-avatar {
      width: 120px;
      height: 120px;
    }

    .icon-edit {
      font-size: 20px;
    }
  }

  @media only screen and (min-width: 1024px) {
    .album-name {
      font-size: 30px;
    }

    .icon-upload-avatar {
      font-size: 25px;
      color: white;
    }

    .back-drop {
      width: 160px;
      height: 160px;
    }

    .album-avatar {
      width: 160px;
      height: 160px;
    }

    .icon-edit {
      font-size: 25px;
    }
  }
`;

const InfoAlbum = styled.div`
  display: flex;
  gap: 30px;
`;

const AlbumName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  gap: 15px;

  .input-album-name {
    border: 1px solid blue;
    border-radius: 5px;
    padding: 10px 10px;
    font-size: 20px;
  }
`;

const Avatar = styled.img`
  border-radius: 100%;
  cursor: pointer;
  object-fit: cover;
  width: 90px;
  height: 90px;
`;

const AvatarContainer = styled.div`
  display: flex;
  border-radius: 100%;
  justify-content: center;
  align-items: center;

  &:hover {
    .back-drop {
      display: flex;
    }
    .icon-upload-avatar {
      display: flex;
      font-size: 25px;
      color: white;
    }
  }
`;

const EditButton = styled.button`
  display: flex;
  color: #6767ff;
  font-size: 15px;
  gap: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  width: 0;

  &.is-saving {
    display: none;
  }

  &:hover {
    color: blue;
  }

  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
  @media only screen and (min-width: 1024px) {
    font-size: 25px;
  }
`;

const SaveButton = styled.button`
  display: flex;
  color: #6767ff;
  font-size: 15px;
  gap: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  width: 0;

  &:hover {
    color: blue;
  }

  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
  @media only screen and (min-width: 1024px) {
    font-size: 25px;
  }
`;

const BackDrop = styled.div`
  display: none;
  background-color: rgb(0 0 0 / 55%);
  border-radius: 100%;
  margin-left: -160px;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  cursor: pointer;
`;

const ImagesCount = styled.h1`
  font-size: 18px;
  font-weight: normal;
`;

export const HeaderPage = ({ album, imagesCount, onUpdateAlbum }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);
  const updateAlbum = useUpdateAlbum();

  const handleOpenDialogFile = () => document.getElementById('avatar').click();

  const handleClickEditButton = () => setIsEditMode(true);

  const handleSaveName = () => {
    const newName = trim(inputRef.current.value);

    if (newName != album.name && newName != '') {
      const updatedAlbumName = { ...album, name: newName };

      updateAlbum(updatedAlbumName.id, updatedAlbumName)
        .then(() => {
          toast.success('Update album name successfully');

          onUpdateAlbum(updatedAlbumName);
          setIsEditMode(false);
        })
        .catch(e => {
          console.log(e);

          setIsEditMode(false);
        });
    } else {
      setIsEditMode(false);
    }
  };

  const handleUpdateAvatar = event => {
    const { files } = event.target;

    if (files.length === 0) {
      return;
    }

    setIsUploading(true);

    uploadImageService(files[0]).then(data => {
      const updatedUrl = data.data.image.url;
      const updatedAlbumAvatar = { ...album, avatar: updatedUrl };

      updateAlbum(updatedAlbumAvatar.id, updatedAlbumAvatar)
        .then(() => {
          toast.success('Update avatar successfully');

          setIsUploading(false);
          onUpdateAlbum(updatedAlbumAvatar);
        })
        .catch(e => {
          console.log(e);

          setIsUploading(false);
        });
    });
  };

  useEffect(() => {
    setIsEditMode(false);
  }, [album]);

  return (
    <Header>
      <InfoAlbum>
        <AvatarContainer>
          <Avatar className="album-avatar" src={album.avatar} alt={album.name} />
          <BackDrop className="back-drop" onClick={handleOpenDialogFile}>
            <FontAwesomeIcon className="icon-upload-avatar" icon={faCloudDownload} />
            <input onChange={handleUpdateAvatar} type="file" id="avatar" style={{ display: 'none' }} />
          </BackDrop>
          {isUploading && <Spinner />}
        </AvatarContainer>

        <AlbumName>
          {!isEditMode && (
            <>
              <span className="album-name">{album.name}</span>
              <EditButton onClick={handleClickEditButton}>
                <FontAwesomeIcon className="icon-edit" icon={faEdit} />
                Edit
              </EditButton>
            </>
          )}

          {isEditMode && (
            <>
              <input className="input-album-name" type="text" defaultValue={album.name} ref={inputRef} />
              <SaveButton onClick={handleSaveName}>
                <FontAwesomeIcon className="icon-save" icon={faCheck} />
                Save
              </SaveButton>
            </>
          )}
        </AlbumName>
      </InfoAlbum>
      <ImagesCount>{imagesCount} IMAGES</ImagesCount>
    </Header>
  );
};

HeaderPage.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  imagesCount: PropTypes.number.isRequired,
  onUpdateAlbum: PropTypes.number.isRequired,
};
