import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { Modal } from 'components/modal.component';
import { notification } from 'components/notification.component';

import { useDeleteAlbum } from 'utilities/data-hooks/albums/use-delete-album.hook';

const { confirm } = Modal;

export const DeleteAlbumModal = ({ album, isOpen, onClose, onDelete }) => {
  const deleteAlbum = useDeleteAlbum();
  const { formatMessage } = useIntl();

  const handleDeleteAlbum = async () => {
    try {
      if (isEmpty(album)) return;

      const deletedAlbumId = await deleteAlbum(album.id);

      notification.success({
        message: formatMessage({ defaultMessage: 'Delete the album successfully!' }),
      });

      onDelete(deletedAlbumId);
    } catch (e) {
      notification.error({
        message: formatMessage({ defaultMessage: 'Delete the album failed!' }),
        description: e.message || formatMessage({ defaultMessage: 'Delete the album occurs error!' }),
      });
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      confirm({
        title: formatMessage({ defaultMessage: 'Confirm' }),
        content: formatMessage({ defaultMessage: 'Are you sure you want to delete this album?' }),
        okText: formatMessage({ defaultMessage: 'Delete' }),
        cancelText: formatMessage({ defaultMessage: 'Cancel' }),
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
