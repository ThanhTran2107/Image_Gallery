import { faCheck, faCloudDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { isEmpty, trim } from 'lodash-es';
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
import { Spin } from 'components/spin.component';
import { ThemeSelector } from 'components/theme-selector.component';

import { COLORS } from 'utilities/constant';
import { useUpdateAlbum } from 'utilities/data-hooks/albums/use-update-albums.hook';
import { uploadImageService } from 'utilities/services/uploadImageService';

import { CreateAlbumModal } from './create-album-modal.component';
import { DeleteAlbumModal } from './delete-album-modal.component';

const Header = styled.div`
  display: flex;
  padding: 1.6rem;
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
  position: relative;
  border-radius: 100%;
  justify-content: center;
  align-items: center;

  &:hover {
    .back-drop {
      display: flex;
      z-index: 1;
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

const SelectActionButton = styled(Button)`
  height: 3.2rem;
  width: 11rem;
  font-size: 1.4rem;

  &.is-disabled {
    background: var(--disabled-color);
  }
`;

const OptionLabel = styled.label`
  font-size: 1.2rem;

  @media only screen and (min-width: 768px) {
    font-size: 1.3rem;
  }

  @media only screen and (min-width: 1024px) {
    font-size: 1.4rem;
  }
`;

const StyledSpinner = styled(Spin)`
  position: absolute;
`;

export const HeaderPage = ({
  albums,
  album,
  imagesCount,
  isSelectAll,
  onUpdateAlbum,
  onAddAlbum,
  onDeleteAlbum,
  onSelectAll,
  onReuploadAll,
  onDeleteAllImages,
}) => {
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

  const { mutateAsync: updateAlbum } = useUpdateAlbum();

  const handleOpenDialogFile = () => document.getElementById('avatar').click();

  const handleClickEditButton = () => setIsEditMode(true);

  const handleSaveName = async () => {
    const newName = trim(inputRef.current.value);

    if (newName !== '' && newName !== album.name) {
      const updatedAlbumName = { ...album, name: newName };

      try {
        await updateAlbum({ albumId: updatedAlbumName.id, album: updatedAlbumName });

        notification.success({
          message: formatMessage({ defaultMessage: 'Update album name successfully!' }),
        });

        onUpdateAlbum(updatedAlbumName);
      } catch (e) {
        console.log(e);
      } finally {
        setIsEditMode(false);
      }
    } else {
      setIsEditMode(false);
    }
  };

  const handleUpdateAvatar = async event => {
    const { files } = event.target;

    if (isEmpty(files)) return;

    setIsUploading(true);

    try {
      const data = await uploadImageService(files[0]);

      const updatedUrl = data.data.image.url;
      const updatedAlbumAvatar = { ...album, avatar: updatedUrl };

      updateAlbum({ albumId: updatedAlbumAvatar.id, album: updatedAlbumAvatar })
        .then(() => {
          notification.success({
            message: formatMessage({ defaultMessage: 'Update album avatar successfully!' }),
          });

          onUpdateAlbum(updatedAlbumAvatar);
        })
        .catch(e => console.log(e))
        .finally(() => setIsUploading(false));
    } catch (e) {
      console.log(e);
    }
  };

  const selectActionItems = [
    {
      label: <OptionLabel>{formatMessage({ defaultMessage: 'Create an album' })}</OptionLabel>,
      key: 'createAlbum',
      onClick: handleOpenCreateAlbumModal,
    },
    {
      label: <OptionLabel>{formatMessage({ defaultMessage: 'Delete the album' })}</OptionLabel>,
      key: 'deleteAlbum',
      onClick: handleOpenDeleteAlbumModal,
    },
  ];

  const selectAllItems = [
    {
      label: <OptionLabel>{formatMessage({ defaultMessage: 'Delete' })}</OptionLabel>,
      key: 'deleteAll',
      onClick: onDeleteAllImages,
    },
    {
      label: <OptionLabel>{formatMessage({ defaultMessage: 'Reupload' })}</OptionLabel>,
      key: 'reuploadAll',
      onClick: onReuploadAll,
    },
  ];

  const menuProps = {
    selectActionItems,
    selectAllItems,
  };

  useEffect(() => {
    setIsEditMode(false);
  }, [album]);

  return (
    <Header>
      <InfoAlbum>
        <Space size="large" direction="horizontal">
          <AvatarContainer>
            <AlbumAvatar className="album-avatar" src={album ? album.avatar : null} alt={album ? album.name : null} />
            <BackDrop className="back-drop" onClick={handleOpenDialogFile}>
              <FontAwesomeIcon className="icon-upload-avatar" icon={faCloudDownload} />
              <input onChange={handleUpdateAvatar} type="file" id="avatar" style={{ display: 'none' }} />
            </BackDrop>
            {isUploading && <StyledSpinner size="large" />}
          </AvatarContainer>

          <AlbumName>
            <Space direction="vertical" size="small">
              {!isEditMode && (
                <>
                  <span className="album-name">{album ? album.name : null}</span>
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
          <ImagesCount className="images-count">
            {imagesCount} {formatMessage({ defaultMessage: 'IMAGES' })}
          </ImagesCount>

          <Space size="middle">
            <Dropdown
              className={classNames({ 'is-disabled': isSelectAll })}
              disabled={isSelectAll}
              menu={{ items: menuProps.selectActionItems }}
            >
              <SelectActionButton className="select-button">
                {formatMessage({ defaultMessage: 'Select Actions' })}
              </SelectActionButton>
            </Dropdown>

            <Dropdown.Button menu={{ items: isSelectAll ? menuProps.selectAllItems : [] }} onClick={onSelectAll}>
              {isSelectAll
                ? formatMessage({ defaultMessage: 'Deselect All' })
                : formatMessage({ defaultMessage: 'Select All' })}
            </Dropdown.Button>
          </Space>
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
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  ).isRequired,
  imagesCount: PropTypes.number.isRequired,
  onUpdateAlbum: PropTypes.func.isRequired,
  onDeleteAlbum: PropTypes.func.isRequired,
  isSelectAll: PropTypes.bool,
  onAddAlbum: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onReuploadAll: PropTypes.func.isRequired,
  onDeleteAllImages: PropTypes.func.isRequired,
};
