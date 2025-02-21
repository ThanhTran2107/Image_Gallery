import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { Modal } from 'components/modal.component';
import { notification } from 'components/notification.component';

import { useDeleteAlbum } from 'utilities/data-hooks/albums/use-delete-album.hook';

const { confirm } = Modal;

export const DeleteAlbumModal = ({ album, isOpen, onClose, onDelete }) => {
  const deleteAlbum = useDeleteAlbum();

  const handleDeleteAlbum = async () => {
    try {
      if (isEmpty(album)) return;

      const deletedAlbumId = await deleteAlbum(album.id);

      if (deletedAlbumId) {
        notification.success({ message: 'Delete the album successfully!' });

        onDelete(deletedAlbumId);
        onClose();
      }
    } catch (e) {
      notification.error({
        message: 'Delete the album failed!',
        description: e.message || 'Delete the album occurs error!',
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      confirm({
        title: 'Confirm',
        content: 'Are you sure you want to delete this album?',
        okText: 'Delete',
        cancelText: 'Cancel',
        okButtonProps: { type: 'default', danger: true },
        onOk: handleDeleteAlbum,
        onCancel: onClose,
      });
    }
  }, [isOpen]);

  return null;
};

DeleteAlbumModal.propTypes = {
  isOpen: PropTypes.bool,
  album: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
