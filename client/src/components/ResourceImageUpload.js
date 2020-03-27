// @flow

import React from 'react';
import { Upload, Icon, message, Button } from 'antd';
import '../css/ResourcePhoneNumberForm.css';

type ImageUploadProps = {
  image: String,
  setImage: () => void,
  setTotalSubmitEnabled: () => void,
};

const ImageUpload = (props: ImageUploadProps) => {
  const { image, setImage, setTotalSubmitEnabled } = props;

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = file => {
    const isValidImage =
      file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isValidImage) {
      message.error('You can only upload JPG/PNG file!');
    }
    return isValidImage;
  };

  const handleUpload = info => {
    const reader = new FileReader();
    // setImage to B64 string upon successful read
    reader.addEventListener('load', () => setImage(reader.result));
    // send image to reader
    reader.readAsDataURL(info.file.originFileObj);
  };

  return (
    <div>
      <Upload
        name="image"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleUpload}
      >
        {image !== null && image !== '' ? (
          <img src={image} alt="" style={{ width: '100%' }} />
        ) : (
          <Icon type="plus" style={{ fontSize: '3em' }} />
        )}
      </Upload>
      <Button onClick={() => setImage('')} className="contact-submit form-btn">
        Remove Image
      </Button>
      <Button
        onClick={() => setTotalSubmitEnabled(false)}
        className="contact-submit form-btn"
      >
        Update Image
      </Button>
    </div>
  );
};

export default ImageUpload;
