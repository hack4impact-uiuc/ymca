// @flow

import React from 'react';
import { useState } from 'react';
import { Modal, Button, Space, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

type ModalProps = {
  modalType: 'add' | 'delete' | 'rename',
};

function ModalView(props: ModalProps) {
  // const { isAddCategory, isDeleteCategory } = props;
  const { modalType } = props;

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
      title: 'Are you sure you want to delete this category?',
      icon: <ExclamationCircleOutlined />,
      content:
        'This will permanently delete the category,' +
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
            <Button type="primary" onClick={showModal}>
              Add Category
            </Button>
            <Modal
              title="Add Category"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input placeholder="New Category" />
            </Modal>
          </div>
        );
      case 'delete':
        return (
          <div>
            <Button onClick={DeleteCategory}>Delete Category</Button>
          </div>
        );
      case 'rename':
        return (
          <div>
            <Button type="primary" onClick={showModal}>
              Rename Category
            </Button>
            <Modal
              title="Rename Category"
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
