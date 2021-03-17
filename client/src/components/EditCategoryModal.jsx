// @flow

import React, { useState } from 'react';

import { Modal, Button, Input } from 'antd';
import {
  CloseOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  addSubcategory,
  deleteSubcategory,
  renameSubcategory,
} from '../utils/api';

type ModalProps = {
  modalType: 'add' | 'delete' | 'rename',
  categoryType: 'subcategory' | 'category',
  subcategoryName: string,
  id: string,
  categoryName: string,
};

function EditCategoryModal(props: ModalProps) {
  const { modalType, categoryType, subcategoryName, id, categoryName } = props;
  const categoryTypeCapitalized =
    categoryType[0].toUpperCase() + categoryType.slice(1);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [addSubcategoryName, setAddSubcategoryName] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (categoryType === 'subcategory') {
      if (modalType === 'rename') {
        renameSubcategory(
          id,
          categoryName,
          subcategoryName,
          newSubcategoryName,
        );
      } else if (modalType === 'delete') {
        deleteSubcategory(id, categoryName, subcategoryName);
      } else if (modalType === 'add') {
        addSubcategory(id, addSubcategoryName);
      }
    }
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
          <>
            <Button type="dashed" onClick={showModal}>
              Add {categoryTypeCapitalized}
            </Button>
            <Modal
              title={`Add ${categoryTypeCapitalized}`}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input
                placeholder={`New ${categoryTypeCapitalized}`}
                onChange={(e) => setAddSubcategoryName(e.target.value)}
              />
            </Modal>
          </>
        );
      case 'delete':
        return (
          <CloseOutlined
            onClick={DeleteCategory}
            style={{ color: '#FF0000' }}
          />
        );
      case 'rename':
        return (
          <>
            <EditOutlined type="primary" onClick={showModal} />
            <Modal
              title={`Rename ${categoryTypeCapitalized}`}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input
                value={subcategoryName}
                onChange={(e) => setNewSubcategoryName(e.target.value)}
              />
            </Modal>
          </>
        );
      default:
        return (
          <div>
            <h1>No component found</h1>
          </div>
        );
    }
  }

  return <>{modal()}</>;
}

export default EditCategoryModal;
