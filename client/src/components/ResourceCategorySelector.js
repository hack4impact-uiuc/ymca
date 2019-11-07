// @flow

import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';

import { getCategories } from '../utils/api';

const { Option } = Select;

const wrappedSetCategory = args => {
  const {
    targetCategory,
    setCategory,
    setSubcategory,
    setFieldsValue,

    fetchedCategories,
    setCurrentSubcategories,
    setSearchCategoryOptions,
    setSearchSubcategoryOptions,
  } = args;

  setCategory(targetCategory);
  setSubcategory('');

  setFieldsValue({
    subcategory: 'Select a subcategory...',
  });

  // set current subcategories
  fetchedCategories.forEach(cat => {
    if (cat.name === targetCategory) {
      setCurrentSubcategories(cat.subcategories);
      setSearchSubcategoryOptions(cat.subcategories);
    }
  });

  // reset search categories list
  setSearchCategoryOptions(fetchedCategories.map(cat => cat.name));
};

type Props = {
  setCategory: () => void,
  setSubcategory: () => void,
  getFieldDecorator: () => any,
  setFieldsValue: () => any,
};

const CategorySelector = (props: Props) => {
  const {
    setCategory,
    setSubcategory,
    getFieldDecorator,
    setFieldsValue,
  } = props;

  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [currentSubcategories, setCurrentSubcategories] = useState([]);
  const [searchCategoryOptions, setSearchCategoryOptions] = useState([]);
  const [searchSubcategoryOptions, setSearchSubcategoryOptions] = useState([]);

  // fetch categories && subcategories
  useEffect(() => {
    getCategories().then(res => {
      if (res !== null) {
        if (res.code === 200) {
          setFetchedCategories(res.result);
          setSearchCategoryOptions(res.result.map(cat => cat.name));
        }
      }
    });
  }, []);

  return (
    <>
      <Form.Item label="Category">
        {getFieldDecorator('category', {
          initialValue: 'Select category...',
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
            showSearch
            onSearch={val => {
              const options = [];
              fetchedCategories.forEach(cat => {
                const { name } = cat;
                if (name.toLowerCase().includes(val.toLowerCase())) {
                  options.push(name);
                }
              });
              setSearchCategoryOptions(options);
            }}
            onChange={val =>
              wrappedSetCategory({
                targetCategory: val,
                setSubcategory,
                setCategory,
                setFieldsValue,
                fetchedCategories,
                setCurrentSubcategories,
                setSearchCategoryOptions,
                setSearchSubcategoryOptions,
              })
            }
          >
            {searchCategoryOptions.map(o => (
              <Option value={o}>{o}</Option>
            ))}
          </Select>,
        )}
      </Form.Item>
      <Form.Item label="Subcategory">
        {getFieldDecorator('subcategory', {
          initialValue: 'Select subcategory...',
          rules: [
            {
              required: true,
              message: 'Please select a subcategory!',
            },
          ],
        })(
          <Select
            className="newResourceSelect"
            placeholder="Select subcategory..."
            showSearch
            onSearch={val => {
              const options = [];
              currentSubcategories.forEach(sub => {
                if (sub.toLowerCase().includes(val.toLowerCase())) {
                  options.push(sub);
                }
              });
              setSearchSubcategoryOptions(options);
            }}
            onChange={val => {
              setSubcategory(val);
              // reset search subcategories
              setSearchSubcategoryOptions(currentSubcategories);
            }}
          >
            {searchSubcategoryOptions.map(o => (
              <Option value={o}>{o}</Option>
            ))}
          </Select>,
        )}
      </Form.Item>
    </>
  );
};

export default CategorySelector;
