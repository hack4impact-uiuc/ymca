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
    setViewableCategories,
  } = args;

  setCategory(targetCategory);
  setSubcategory('');

  setFieldsValue({
    subcategory: 'Select a subcategory...',
  });

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
              setViewableCategories(options);
            }}
            onChange={val =>
              wrappedSetCategory({
                targetCategory: val,
                setSubcategory,
                setCategory,
                setFieldsValue,
                fetchedCategories,
                setAvailableSubcategories,
                setViewableCategories,
                setViewableSubcategories,
              })
            }
          >
            {viewableCategories.map(o => (
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
              availableSubcategories.forEach(sub => {
                if (sub.toLowerCase().includes(val.toLowerCase())) {
                  options.push(sub);
                }
              });
              setViewableSubcategories(options);
            }}
            onChange={val => {
              setSubcategory(val);
              // reset search subcategories
              setViewableSubcategories(availableSubcategories);
            }}
          >
            {viewableSubcategories.map(o => (
              <Option value={o}>{o}</Option>
            ))}
          </Select>,
        )}
      </Form.Item>
    </>
  );
};

export default CategorySelector;
