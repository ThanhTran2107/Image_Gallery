import { faCheck, faCloudDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS } from 'constant';
import { trim } from 'lodash-es';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { Spinner } from 'components/spinner.component';
import { ThemeSelector } from 'components/theme-selector.component';

import { uploadImageService } from 'services/uploadImageService';

import { useUpdateAlbum } from 'utilities/hooks/data-hooks/albums/use-update-albums.hook';

import { Avatar } from '../../components/avatar.component';
import { Space } from '../../components/space.component';

const Header = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;

  @media only screen and (min-width: 768px) {
    .album-name {
      font-size: 2rem;
    }

    .back-drop {
      width: 12rem;
      height: 12rem;
    }

    .album-avatar {
      width: 12rem;
      height: 12rem;
    }

    .icon-edit {
      font-size: 1rem;
    }

    .icon-save {
      font-size: 1rem;
    }
  }

  @media only screen and (min-width: 1024px) {
    .album-name {
      font-size: 2.5rem;
    }

    .back-drop {
      width: 16rem;
      height: 16rem;
    }

    .album-avatar {
      width: 16rem;
      height: 16rem;
    }

    .icon-edit {
      font-size: 2rem;
    }

    .icon-save {
      font-size: 2rem;
    }
  }
`;

const InfoAlbum = styled.div`
  display: flex;

  @media only screen and (min-width: 768px) {
    gap: 1.5rem;
  }
  @media only screen and (min-width: 1024px) {
    gap: 2rem;
  }
`;

const AlbumName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;

  .input-album-name {
    border: 0.1rem solid blue;
    border-radius: 0.5rem;
    padding: 1rem 1rem;
    font-size: 2rem;
    color: ${COLORS.BLACK};
  }
`;

const AlbumAvatar = styled(Avatar)`
  border-radius: 100%;
  cursor: pointer;
  object-fit: cover;
  width: 8rem;
  height: 8rem;
`;

const AvatarContainer = styled.div`
  display: flex;
  border-radius: 100%;
  justify-content: center;
  align-items: center;

  &:hover {
    .back-drop {
      display: flex;
      z-index: 99;
    }

    .icon-upload-avatar {
      display: flex;
      font-size: 2.5rem;
      color: ${COLORS.WHITE};
    }
  }
`;

const EditButton = styled(FontAwesomeIcon)`
  color: ${COLORS.BRIGHT_BLUE};
  font-size: 0.8rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: fit-content;

  &.is-saving {
    display: none;
  }

  &:hover {
    color: ${COLORS.BLUE};
  }
`;

const SaveButton = styled(FontAwesomeIcon)`
  color: ${COLORS.BRIGHT_BLUE};
  font-size: 0.8rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: fit-content;

  &:hover {
    color: ${COLORS.BLUE};
  }
`;

const BackDrop = styled.div`
  display: none;
  background-color: ${COLORS.BLACK_55};
  border-radius: 100%;
  margin-left: -16rem;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
`;

const ImagesCount = styled.h1`
  font-size: 0.5rem;
  font-weight: normal;

  @media only screen and (min-width: 768px) {
    font-size: 1rem;
  }
  @media only screen and (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const StyledSpinner = styled(Spinner)`
  width: 4rem;
  height: 4rem;
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
        <Space size="large" direction="horizontal">
          <AvatarContainer>
            <AlbumAvatar className="album-avatar" src={album.avatar} alt={album.name} />
            <BackDrop className="back-drop" onClick={handleOpenDialogFile}>
              <FontAwesomeIcon className="icon-upload-avatar" icon={faCloudDownload} />
              <input onChange={handleUpdateAvatar} type="file" id="avatar" style={{ display: 'none' }} />
            </BackDrop>
            {isUploading && <StyledSpinner />}
          </AvatarContainer>

          <AlbumName>
            <Space direction="vertical" size="small">
              {!isEditMode && (
                <>
                  <span className="album-name">{album.name}</span>
                  <EditButton className="icon-edit" icon={faEdit} onClick={handleClickEditButton} />
                </>
              )}

              {isEditMode && (
                <>
                  <input className="input-album-name" type="text" defaultValue={album.name} ref={inputRef} />
                  <SaveButton className="icon-save" icon={faCheck} onClick={handleSaveName} />
                </>
              )}
            </Space>
          </AlbumName>
        </Space>
      </InfoAlbum>

      <Space direction="vertical" align="end" justify="space-between">
        <ThemeSelector />
        <ImagesCount>{imagesCount} IMAGES</ImagesCount>
      </Space>
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
