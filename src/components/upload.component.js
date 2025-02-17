import { Upload as BaseUpload } from 'antd';
import { useState } from 'react';

import { Image } from 'components/image.component';

import { getBase64 } from 'utilities/services/image';

export const Upload = props => {
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async file => {
    const { originFileObj: fileObj } = file;

    if (fileObj instanceof File) {
      const base64 = await getBase64(fileObj);

      setPreviewImage(base64);
    }
  };

  return (
    <>
      <BaseUpload {...props} onPreview={handlePreview} />

      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: !!previewImage,
            onVisibleChange: () => setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
