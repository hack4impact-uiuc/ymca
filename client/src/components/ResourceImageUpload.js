// @flow

import React, { useState } from 'react';
import { Upload, Icon, message } from 'antd';

type ImageUploadProps = {
  image: String,
  setImage: () => void,
};

const ImageUpload = (props: ImageUploadProps) => {
  const {
    image,
    setImage
  } = props;

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const beforeUpload = file =>
  {
    const isValidImage = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isValidImage) {
      message.error('You can only upload JPG/PNG file!');
    }
    return isValidImage;
  }

  const handleUpload = info =>
  {
      getBase64(info.file.originFileObj, imageUrl =>
        {
          setImage(imageUrl);
        }
      );
  }

  return (
    <Upload
      name="image"
      listType="picture-card"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleUpload}
    >
      {image != '' && image != null ? <img src={image} alt="avatar" style={{ width: '100%' }} /> : 
        <Icon type="plus" style={{ fontSize: '3em' }} />}
    </Upload>
  );
};

export default ImageUpload;
