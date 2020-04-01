// @flow

import React, { useState } from 'react';
import { Upload, Icon, message, Button, Modal, Slider } from 'antd';
import Cropper from 'react-easy-crop';
import '../css/ResourceImageUpload.css';

type ImageUploadProps = {
  image: String,
  setImage: () => void,
};

const ImageUpload = (props: ImageUploadProps) => {
  const { image, setImage } = props;

  const [showCropper, setShowCropper] = useState(false);
  const [croppingImg, setCroppingImg] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixels, setCroppedPixels] = useState();

  const changeCrop = c => setCrop(c);
  const changeZoom = z => setZoom(z);
  const onCropComplete = (area, pixels) => setCroppedPixels(pixels);

  /* These two functions are from the creators of react-easy-crop */
  const createImage = url =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', error => reject(error));
      img.src = url;
    });
  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const img = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const safeArea = Math.max(img.width, img.height) * 2;
    canvas.width = safeArea;
    canvas.height = safeArea;
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.translate(-safeArea / 2, -safeArea / 2);
    ctx.drawImage(
      img,
      safeArea / 2 - img.width * 0.5,
      safeArea / 2 - img.height * 0.5,
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.putImageData(
      data,
      0 - safeArea / 2 + img.width * 0.5 - pixelCrop.x,
      0 - safeArea / 2 + img.height * 0.5 - pixelCrop.y,
    );
    return canvas.toDataURL('image/jpeg');
  };

  const saveCrop = async () => {
    const croppedImg = await getCroppedImg(croppingImg, croppedPixels);
    setImage(croppedImg);
    setShowCropper(false);
  };

  const beforeUpload = file => {
    const isValidImage =
      file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isValidImage) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isSmall = file.size / 1024 / 1024 < 2;
    if (!isSmall) {
      message.error('Image must smaller than 2MB!');
    }
    return isValidImage && isSmall;
  };

  const handleUpload = event => {
    if (event.file.status !== 'uploading') return;
    const reader = new FileReader();
    // setImage to B64 string upon successful image read
    reader.addEventListener('load', () => setCroppingImg(reader.result));
    // send image to reader
    reader.readAsDataURL(event.file.originFileObj);
    setShowCropper(true);
  };

  return (
    <>
      <Upload
        name="image"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleUpload}
      >
        {image !== null && image !== '' && image !== undefined ? (
          <img src={image} alt="" style={{ width: '100%' }} />
        ) : (
          <Icon type="plus" style={{ fontSize: '3em' }} />
        )}
      </Upload>
      <Button
        onClick={() => {
          setImage('');
          setShowCropper(false);
        }}
        className="upload-button"
      >
        Remove Image
      </Button>
      <Modal
        title="Crop Image"
        visible={
          showCropper &&
          croppingImg !== null &&
          croppingImg !== '' &&
          croppingImg !== undefined
        }
        onOk={saveCrop}
        onCancel={() => setShowCropper(false)}
        okButtonProps={{ className: 'upload-button' }}
      >
        <div className="crop-container">
          <Cropper
            image={croppingImg}
            crop={crop}
            zoom={zoom}
            aspect={7 / 5}
            onCropChange={changeCrop}
            onCropComplete={onCropComplete}
            onZoomChange={changeZoom}
          />
        </div>
        <Slider min={1} max={3} value={zoom} step={0.1} onChange={changeZoom} />
      </Modal>
    </>
  );
};

export default ImageUpload;
