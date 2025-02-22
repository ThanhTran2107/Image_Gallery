import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from 'components/modal.component';
import { notification } from 'components/notification.component';

import { useDeleteAlbum } from 'utilities/data-hooks/albums/use-delete-album.hook';

const { confirm } = Modal;

export const DeleteAlbumModal = ({ album, isOpen, onClose, onDelete }) => {
  const deleteAlbum = useDeleteAlbum();

  const { t } = useTranslation();

  const handleDeleteAlbum = async () => {
    try {
      if (isEmpty(album)) return;

      const deletedAlbumId = await deleteAlbum(album.id);

      if (deletedAlbumId) {
        notification.success({ message: t('delete_album_success') });

        onDelete(deletedAlbumId);
        onClose();
      }
    } catch (e) {
      notification.error({
        message: t('delete_album_failed'),
        description: e.message || t('delete_album_failed_details'),
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      confirm({
        title: t('confirm'),
        content: t('confirm_delete_album_question'),
        okText: t('delete'),
        cancelText: t('cancel'),
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
