import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trim } from 'lodash-es';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Button } from 'components/button.component';
import { Form } from 'components/form.component';
import { Input } from 'components/input.component';
import { Modal } from 'components/modal.component';
import { notification } from 'components/notification.component';
import { Space } from 'components/space.component';
import { Upload } from 'components/upload.component';

import { useAddAlbum } from 'utilities/data-hooks/albums/use-add-album.hook';
import { uploadImageService } from 'utilities/services/uploadImageService';

const StyledButton = styled(Button)`
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

export const CreateAlbumModal = ({ isOpen, albums, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form] = Form.useForm();

  const addAlbum = useAddAlbum();
  const { t } = useTranslation();

  const handleCreateNewAlbum = async () => {
    try {
      setIsSubmitting(true);

      const values = await form.validateFields();

      const { name, avatar } = values;
      const { file } = avatar || {};
      const order = albums.length;
      let avatarUrl = '';

      if (values.avatar) {
        const { originFileObj: fileObj } = file;

        const { data, error } = await uploadImageService(fileObj);

        if (error) throw new Error(error?.message || t('upload_file_failed'));

        avatarUrl = data.image.url;
      }

      const newAlbum = {
        name: trim(name),
        avatar: avatarUrl,
        order: order,
      };

      const newAlbumID = await addAlbum(newAlbum);

      if (newAlbumID) {
        notification.success({
          message: t('create_album_success'),
        });

        onSubmit({ ...newAlbum, id: newAlbumID });
        onClose();
      }
    } catch (e) {
      notification.error({
        message: t('create_album_failed'),
        description: e.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) form.resetFields();
  }, [isOpen]);

  return (
    <Modal
      title={t('create_an_album')}
      open={isOpen}
      onOk={handleCreateNewAlbum}
      onCancel={onClose}
      okText={t('create')}
      cancelText={t('cancel')}
      confirmLoading={isSubmitting}
      maskClosable={false}
      cancelButtonProps={{ disabled: isSubmitting }}
      closeIcon={false}
    >
      <Form
        form={form}
        name="createAlbumModal"
        layout="vertical"
        autoComplete="off"
        onFinish={handleCreateNewAlbum}
        style={{ marginTop: '2rem' }}
      >
        <Form.Item
          label={t('name')}
          name="name"
          rules={[
            { required: true, message: t('album_name_rule') },
            {
              type: 'string',
              whitespace: true,
            },
          ]}
        >
          <Input placeholder={t('place_holder_album_name')} />
        </Form.Item>

        <Form.Item label={t('avatar')} name="avatar">
          <Upload listType="picture-card" maxCount={1}>
            <StyledButton type="button">
              <Space direction="vertical">
                <FontAwesomeIcon icon={faPlus} />
              </Space>
            </StyledButton>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateAlbumModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  ).isRequired,
};
