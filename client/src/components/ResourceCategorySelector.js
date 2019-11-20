// @flow

import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';

import { getCategories } from '../utils/api';

const { Option, OptGroup } = Select;

const wrappedSetCategory = args => {
  const {
    targetCategory,
    setCategory,
    setSubcategory,
    setFieldsValue,

    fetchedCategories,
    setViewableCategories,
  } = args;

  setCategory(targetCategory);
  setSubcategory('');

  setFieldsValue({});

  // reset search categories list
  setViewableCategories(fetchedCategories.map(cat => cat.name));
};

type Props = {
  category: string,
  setCategory: () => void,
  setSubcategory: () => void,
  getFieldDecorator: () => any,
  setFieldsValue: () => any,
};

const CategorySelector = (props: Props) => {
  const {
    category,
    setCategory,
    setSubcategory,
    getFieldDecorator,
    setFieldsValue,
  } = props;

  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [viewableCategories, setViewableCategories] = useState([]);
  const [viewableSubcategories, setViewableSubcategories] = useState([]);
  // const [options, setOptions] = useState({});
  // const [viewableOptions, setViewableOptions] = useState([]);

  const onCategoryChange = val => {
    wrappedSetCategory({
      targetCategory: val,
      setSubcategory,
      setCategory,
      setFieldsValue,
      fetchedCategories,
      setAvailableSubcategories,
      setViewableCategories,
      setViewableSubcategories,
    });
  };

  const onSubcategorySearch = val => {
    const options = [];
    availableSubcategories.forEach(sub => {
      if (sub.toLowerCase().includes(val.toLowerCase())) {
        options.push(sub);
      }
    });
    setViewableSubcategories(options);
  };

  // fetch categories && subcategories
  useEffect(() => {
    getCategories().then(res => {
      if (res !== null) {
        if (res.code === 200) {
          setFetchedCategories(res.result);
          setViewableCategories(res.result.map(cat => cat.name));
        }
      }
    });
  }, []);

  // set current subcategories
  useEffect(() => {
    fetchedCategories.forEach(cat => {
      if (cat.name === category) {
        setAvailableSubcategories(cat.subcategories);
        setViewableSubcategories(cat.subcategories);
      }
    });
  }, [
    category,
    fetchedCategories,
    setAvailableSubcategories,
    setViewableSubcategories,
  ]);

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
            placeholder="Select category..."
            mode="multiple"
            showSearch
            onChange={onCategoryChange}
          >
            {fetchedCategories.map(cat => (
              <OptGroup label={cat.name}>
                {cat.subcategories.map(subcat => (
                  <Option value={`${cat.name}~${subcat}`}>{subcat}</Option>
                ))}
              </OptGroup>
            ))}
          </Select>,
        )}
      </Form.Item>
    </>
  );
};

export default CategorySelector;
