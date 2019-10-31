// @flow

import React, { useState } from 'react';
import { Input, Form } from 'antd';
import Select from 'react-select';
import { getCategories } from '../utils/api';

const wrappedSetCategory = (
  targetCategory,
  setCategory,
  setSubcategoryOptions,
) => {
  setCategory(targetCategory);

  getCategories().then(res => {
    if (res.code === 200) {
      setSubcategoryOptions(res.result[targetCategory].subcategories);
    }
  });
};

type Props = {
  category: String,
  subcategory: String,
  setCategory: () => void,
  setSubcategory: () => void,
  getFieldDecorator: () => any,
};

const CategorySelector = (props: Props) => {
  const {
    category,
    subcategory,
    setCategory,
    setSubcategory,
    getFieldDecorator,
  } = props;

  const [categoryOptions, setCategoryOptions] = useState([{}]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([
    {
      label: 'Please select a category first',
      value: 'null',
    },
  ]);

  getCategories().then(res => {
    if (res.code === 200) {
      const fetchedCategories = res.result;
      const categories = [];

      Object.values(categories).forEach(c => {
        categories.push(c.name);
      });

      setCategoryOptions(categories);
    }
  });

  return (
    <>
      <Form.Item label="Category">
        {getFieldDecorator('category', {
          rules: [
            {
              required: true,
              message: 'Please select a category!',
            },
          ],
        })(
          <Select
            className="newResourceSelect"
            options={categoryOptions}
            onChange={e =>
              wrappedSetCategory(e.value, setCategory, setSubcategoryOptions)
            }
            placeholder="Select category..."
          />,
        )}
      </Form.Item>
      <Form.Item label="Subcategory">
        {getFieldDecorator('subcategory', {
          rules: [
            {
              required: true,
              message: 'Please select a subcategory!',
            },
          ],
        })(
          <Select
            className="newResourceSelect"
            options={subcategoryOptions}
            onChange={e => setSubcategory(e.value)}
            placeholder="Select subcategory..."
          />,
        )}
      </Form.Item>
    </>
  );
};

export default CategorySelector;
