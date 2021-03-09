// @flow

import React from 'react';
import { useState } from 'react';
import { Modal, Button, Space, Input, icon } from 'antd';
import {
  CloseOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

type ModalProps = {
  modalType: 'add' | 'delete' | 'rename',
  categoryType: 'subcategory' | 'category',
};

function ModalView(props: ModalProps) {
  const { modalType, categoryType } = props;
  const categoryTypeCapitalized =
    categoryType[0].toUpperCase() + categoryType.slice(1);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function DeleteCategory() {
    Modal.confirm({
      title: `Are you sure you want to delete this ${categoryType}?`,
      icon: <ExclamationCircleOutlined />,
      content:
        `This will permanently delete the ${categoryType},` +
        ' and untag resources associated.',
      okText: 'Yes',
      cancelText: 'No',
    });
  }

  function modal() {
    switch (modalType) {
      case 'add':
        return (
          <div>
            <Button type="dashed" onClick={showModal}>
              Add {categoryTypeCapitalized}
            </Button>
            <Modal
              title={`Add ${categoryTypeCapitalized}`}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input placeholder={`New ${categoryTypeCapitalized}`} />
            </Modal>
          </div>
        );
      case 'delete':
        return <CloseOutlined onClick={DeleteCategory}> </CloseOutlined>;
      case 'rename':
        return (
          <div>
            <EditOutlined type="primary" onClick={showModal}>
              {' '}
            </EditOutlined>
            <Modal
              title={`Rename ${categoryTypeCapitalized}`}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input placeholder="Legal Aid" />
            </Modal>
          </div>
        );
      default:
        return (
          <div>
            <h1>No component found</h1>
          </div>
        );
    }
  }

  return <div>{modal()}</div>;
}

export default ModalView;
