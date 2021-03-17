// @flow

import React, { useState } from 'react';

import { Modal, Button, Input } from 'antd';
import {
  CloseOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  addCategory,
  addSubcategory,
  deleteCategory,
  deleteSubcategory,
  renameCategory,
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
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addSubcategoryName, setAddSubcategoryName] = useState('');
  const [addCategoryName, setAddCategoryName] = useState('');

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
    } else if (categoryType === 'category') {
      if (modalType === 'rename') {
        renameCategory(id, newCategoryName, categoryName);
      } else if (modalType === 'add') {
        const category = {
          _id: id,
          name: addCategoryName,
          subcategories: [''],
        };
        addCategory(category);
      } else if (modalType === 'delete') {
        deleteCategory(id);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const findValueName = () => {
    if (categoryType === 'category') {
      return categoryName;
    }
    return subcategoryName;
  };

  function onChangeRename(value) {
    if (categoryType === 'category') {
      setNewCategoryName(value);
    }
    setNewSubcategoryName(value);
  }

  function onChangeAdd(value) {
    if (categoryType === 'category') {
      setAddCategoryName(value);
    }
    setAddSubcategoryName(value);
  }

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
                onChange={(e) => onChangeAdd(e.target.value)}
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
                value={findValueName}
                onChange={(e) => onChangeRename(e.target.value)}
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
