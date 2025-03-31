import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trim } from 'lodash-es';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
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

  const { formatMessage } = useIntl();

  const [form] = Form.useForm();
  const { mutateAsync: addAlbum } = useAddAlbum();

  const handleCreateNewAlbum = async () => {
    setIsSubmitting(true);

    try {
      const values = await form.validateFields();

      const { name, avatar } = values;
      const { file } = avatar || {};
      const order = albums.length;
      let avatarUrl = '';

      if (avatar) {
        const { originFileObj: fileObj } = file;
        const { data, error } = await uploadImageService(fileObj);

        if (error) throw new Error(error?.message || formatMessage({ defaultMessage: 'Upload image occurs error!' }));

        avatarUrl = data.image.url;
      }

      const newAlbum = {
        name: trim(name),
        avatar: avatarUrl,
        order,
      };

      const newAlbumId = await addAlbum(newAlbum);

      notification.success({
        message: formatMessage({ defaultMessage: 'Create a new album successfully!' }),
      });

      onSubmit({ ...newAlbum, id: newAlbumId });
      onClose();
    } catch (e) {
      console.log(e);

      notification.error({
        message: formatMessage({ defaultMessage: 'Create an album failed!' }),
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
      title={formatMessage({ defaultMessage: 'Create an album' })}
      open={isOpen}
      onOk={handleCreateNewAlbum}
      onCancel={onClose}
      okText={formatMessage({ defaultMessage: 'Create' })}
      cancelText={formatMessage({ defaultMessage: 'Cancel' })}
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
          label={formatMessage({ defaultMessage: 'Name' })}
          name="name"
          rules={[
            {
              required: true,
              message: formatMessage({ defaultMessage: 'Please enter the album name!' }),
            },
            {
              type: 'string',
              whitespace: true,
            },
          ]}
        >
          <Input placeholder={formatMessage({ defaultMessage: 'Enter the album name' })} />
        </Form.Item>

        <Form.Item label={formatMessage({ defaultMessage: 'Avatar' })} name="avatar">
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
