// @flow

import React, { useState } from 'react';

import { Modal, Input } from 'antd';
import {
  CloseOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
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
  fetchCategories: () => void,
};

function EditCategoryModal(props: ModalProps) {
  const {
    modalType,
    categoryType,
    subcategoryName,
    id,
    categoryName,
    fetchCategories,
  } = props;
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

  async function handleSubmit() {
    if (categoryType === 'subcategory') {
      if (modalType === 'rename') {
        await renameSubcategory(
          id,
          categoryName,
          subcategoryName,
          newSubcategoryName,
        );
      } else if (modalType === 'add') {
        await addSubcategory(id, addSubcategoryName);
      }
    } else if (categoryType === 'category') {
      if (modalType === 'rename') {
        await renameCategory(id, newCategoryName, categoryName);
      } else if (modalType === 'add') {
        const category = {
          _id: id,
          name: addCategoryName,
          subcategories: [],
        };
        await addCategory(category);
      }
    }
  }

  const handleOk = async () => {
    setIsModalVisible(false);
    await handleSubmit();
    fetchCategories();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function findValueName() {
    if (categoryType === 'category') {
      return categoryName;
    }
    return subcategoryName;
  }

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
      async onOk() {
        if (categoryType === 'category') {
          await deleteCategory(id, categoryName);
          fetchCategories();
        } else if (categoryType === 'subcategory') {
          await deleteSubcategory(id, categoryName, subcategoryName);
          fetchCategories();
        }
      },
    });
  }

  function modal() {
    switch (modalType) {
      case 'add':
        return (
          <>
            <PlusOutlined
              onClick={showModal}
              style={{ position: 'relative', top: 10 }}
            />
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
                defaultValue={findValueName()}
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
