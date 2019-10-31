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
      const subcategories = [];

      Object.values(res.result).forEach(category => {
        if (category.name === targetCategory) {
          category.subcategories.forEach(entry => {
            subcategories.push({
              label: entry,
              value: entry,
            });
          });
        }
      });

      setSubcategoryOptions(subcategories);
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

  const [categoryOptions, setCategoryOptions] = useState([]);
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

      Object.values(fetchedCategories).forEach(c => {
        categories.push({
          label: c.name,
          value: c.name,
        });
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
