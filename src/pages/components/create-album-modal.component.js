import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trim } from 'lodash-es';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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

        if (error) throw new Error(error?.message || 'Upload image occurs error !');

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
          message: 'Create a new album successfully!',
        });

        onSubmit({ ...newAlbum, id: newAlbumID });
        onClose();
      }
    } catch (e) {
      notification.error({
        message: 'Create an album failed!',
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
      title="Create an album"
      open={isOpen}
      onOk={handleCreateNewAlbum}
      onCancel={onClose}
      okText="Create"
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
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter the album name' },
            {
              type: 'string',
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Enter the album name" />
        </Form.Item>

        <Form.Item label="Avatar" name="avatar">
          <Upload listType="picture-card" maxCount={1}>
            <StyledButton type="button">
              <Space direction="vertical">
                <FontAwesomeIcon icon={faPlus} />
                Upload
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
