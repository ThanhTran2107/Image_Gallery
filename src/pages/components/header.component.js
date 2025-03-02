import { faCheck, faCloudDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trim } from 'lodash-es';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import { Avatar } from 'components/avatar.component';
import { Button } from 'components/button.component';
import { Divider } from 'components/divider.component';
import { Dropdown } from 'components/dropdown.component';
import { LanguageSelector } from 'components/language-selector.component';
import { notification } from 'components/notification.component';
import { Space } from 'components/space.component';
import { Spinner } from 'components/spinner.component';
import { ThemeSelector } from 'components/theme-selector.component';

import { COLORS } from 'utilities/constant';
import { useUpdateAlbum } from 'utilities/data-hooks/albums/use-update-albums.hook';
import { uploadImageService } from 'utilities/services/uploadImageService';

import { CreateAlbumModal } from './create-album-modal.component';
import { DeleteAlbumModal } from './delete-album-modal.component';

const Header = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
`;

const InfoAlbum = styled.div`
  display: flex;
`;

const AlbumName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;

  @media only screen and (min-width: 768px) {
    font-size: 2rem;
  }

  @media only screen and (min-width: 1024px) {
    font-size: 2.5rem;
  }

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

  @media only screen and (min-width: 768px) {
    width: 12rem;
    height: 12rem;
  }

  @media only screen and (min-width: 1024px) {
    width: 16rem;
    height: 16rem;
  }
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
  font-size: 1rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: fit-content;

  @media only screen and (min-width: 768px) {
    font-size: 1.5rem;
  }

  @media only screen and (min-width: 1024px) {
    font-size: 2rem;
  }

  &.is-saving {
    display: none;
  }

  &:hover {
    color: ${COLORS.BLUE};
  }
`;

const SaveButton = styled(FontAwesomeIcon)`
  color: ${COLORS.BRIGHT_BLUE};
  font-size: 1rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: fit-content;

  @media only screen and (min-width: 768px) {
    font-size: 1.5rem;
  }

  @media only screen and (min-width: 1024px) {
    font-size: 2rem;
  }

  &:hover {
    color: ${COLORS.BLUE};
  }
`;

const BackDrop = styled.div`
  display: none;
  background-color: ${COLORS.BLACK_55};
  border-radius: 100%;
  margin-left: -8rem;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  cursor: pointer;

  @media only screen and (min-width: 768px) {
    margin-left: -12rem;
    width: 12rem;
    height: 12rem;
  }

  @media only screen and (min-width: 1024px) {
    margin-left: -16rem;
    width: 16rem;
    height: 16rem;
  }
`;

const ImagesCount = styled.h1`
  font-size: 1rem;
  font-weight: normal;

  @media only screen and (min-width: 768px) {
    font-size: 1.3rem;
  }

  @media only screen and (min-width: 1024px) {
    font-size: 1.4rem;
  }
`;

const StyledSpinner = styled(Spinner)`
  width: 4rem;
  height: 4rem;
`;

const SelectButton = styled(Button)`
  height: 2rem;
  width: 8rem;
  font-size: 1rem;

  @media only screen and (min-width: 768px) {
    height: 2.8rem;
    width: 10.8rem;
    font-size: 1.3rem;
  }

  @media only screen and (min-width: 1024px) {
    height: 3rem;
    width: 11rem;
    font-size: 1.4rem;
  }
`;

const OptionLabels = styled.label`
  font-size: 1.2rem;

  @media only screen and (min-width: 768px) {
    font-size: 1.3rem;
  }

  @media only screen and (min-width: 1024px) {
    font-size: 1.4rem;
  }
`;
export const HeaderPage = ({ albums, album, imagesCount, onUpdateAlbum, onAddAlbum, onDeleteAlbum }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpenCreateAlbumForm, setIsOpenCreateAlbumForm] = useState(false);
  const [isOpenDeleteAlbumForm, setIsOpenDeleteAlbumForm] = useState(false);

  const { formatMessage } = useIntl();

  const handleOpenCreateAlbumModal = () => setIsOpenCreateAlbumForm(true);

  const handleCloseCreateAlbumModal = () => setIsOpenCreateAlbumForm(false);

  const handleOpenDeleteAlbumModal = () => setIsOpenDeleteAlbumForm(true);

  const handleCloseDeleteAlbumModal = () => setIsOpenDeleteAlbumForm(false);

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
          notification.success({
            message: formatMessage({ defaultMessage: 'Update album name successfully!' }),
          });

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

    if (files.length === 0) return;

    setIsUploading(true);

    uploadImageService(files[0]).then(data => {
      const updatedUrl = data.data.image.url;
      const updatedAlbumAvatar = { ...album, avatar: updatedUrl };

      updateAlbum(updatedAlbumAvatar.id, updatedAlbumAvatar)
        .then(() => {
          notification.success({
            message: formatMessage({ defaultMessage: 'Update album avatar successfully!' }),
          });

          setIsUploading(false);
          onUpdateAlbum(updatedAlbumAvatar);
        })
        .catch(e => {
          console.log(e);

          setIsUploading(false);
        });
    });
  };

  const items = [
    {
      label: <OptionLabels>{formatMessage({ defaultMessage: 'Create an album' })}</OptionLabels>,
      key: '1',
      onClick: handleOpenCreateAlbumModal,
    },
    {
      label: <OptionLabels>{formatMessage({ defaultMessage: 'Delete the album' })}</OptionLabels>,
      key: '2',
      onClick: handleOpenDeleteAlbumModal,
    },
  ];

  const menuProps = {
    items,
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
        <Space size="small" split={<Divider type="vertical" />}>
          <LanguageSelector />
          <ThemeSelector />
        </Space>

        <Space direction="vertical" size="small" align="end">
          <ImagesCount>
            {imagesCount} {formatMessage({ defaultMessage: 'IMAGES' })}
          </ImagesCount>
          <Dropdown menu={menuProps}>
            <SelectButton className="select-button">{formatMessage({ defaultMessage: 'Select Actions' })}</SelectButton>
          </Dropdown>
        </Space>
      </Space>

      <CreateAlbumModal
        isOpen={isOpenCreateAlbumForm}
        albums={albums}
        onClose={handleCloseCreateAlbumModal}
        onSubmit={onAddAlbum}
      />

      <DeleteAlbumModal
        isOpen={isOpenDeleteAlbumForm}
        album={album}
        onClose={handleCloseDeleteAlbumModal}
        onDelete={onDeleteAlbum}
      />
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
  onUpdateAlbum: PropTypes.func.isRequired,
  onDeleteAlbum: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  onAddAlbum: PropTypes.func.isRequired,
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  ).isRequired,
};
