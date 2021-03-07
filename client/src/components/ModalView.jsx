// @flow

import React from 'react';
import { useState } from 'react';
import { Modal, Button, Space, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

type ModalProps = {
  isAddCategory: boolean,
  isDeleteCategory: boolean,
};

function ModalView(props: ModalProps) {
  const { isAddCategory, isDeleteCategory } = props;

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

  return (
    <>
      {isAddCategory ? (
        <>
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
        </>
      ) : (
        <>
          {isDeleteCategory ? (
            <>
              <Button onClick={DeleteCategory}>Delete Category</Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </>
      )}
    </>
  );
}

export default ModalView;
