// @flow

import React, { useState } from 'react';
import { Form, Select } from 'antd';
// import Select from 'react-select';
import { getCategories } from '../utils/api';

const { Option } = Select;

const wrappedSetCategory = args => {
  const {
    targetCategory,
    setCategory,
    setSubcategory,
    setFieldsValue,

    subcategoryOptions,
    setSubcategoryStrOptions,
    categoryOptions,
  } = args;

  setCategory(targetCategory);
  setSubcategory('');

  setFieldsValue({
    subcategory: 'Select a subcategory...',
  });

  const subcategoryStrs = [];
  categoryOptions.forEach(key => {
    if (key === targetCategory) {
      subcategoryOptions[key].forEach(sub => {
        subcategoryStrs.push(sub);
      });
    }
  });

  setSubcategoryStrOptions(subcategoryStrs);
};

type Props = {
  category: String,
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

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState({});
  const [subcategoryStrOptions, setSubcategoryStrOptions] = useState([]);

  getCategories()
    .then(res => {
      if (res.code === 200) {
        const fetchedCategories = res.result;
        const categories = [];
        const subcategories = {};

        Object.values(fetchedCategories).forEach(cat => {
          categories.push(cat.name);
          subcategories[cat.name] = [];

          cat.subcategories.forEach(sub => {
            subcategories[cat.name].push(sub);
          });
        });

        setCategoryOptions(categories);
        setSubcategoryOptions(subcategories);
      }
    })
    .then
    // stop loading bar
    ();

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
            showSearch
            placeholder="Select category..."
            onSearch={val => {
              const options = [];
              categoryOptions.forEach(o => {
                if (o.toLowerCase().includes(val.toLowerCase())) {
                  options.push(o);
                }
              });
              setCategoryOptions(options);
            }}
            onChange={val =>
              wrappedSetCategory({
                targetCategory: val,
                setSubcategory,
                setCategory,
                setSubcategoryOptions,
                setFieldsValue,
                subcategoryOptions,
                setSubcategoryStrOptions,
                categoryOptions,
              })
            }
          >
            {categoryOptions.map(o => (
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
              Object.keys(subcategoryOptions).forEach(key => {
                if (key === category) {
                  subcategoryOptions[key].forEach(o => {
                    if (o.toLowerCase().includes(val.toLowerCase())) {
                      options.push(o);
                    }
                  });
                }
              });
              setSubcategoryStrOptions(options);
            }}
            onChange={val => {
              setSubcategory(val);

              const options = [];
              Object.keys(subcategoryOptions).forEach(key => {
                if (key === category) {
                  subcategoryOptions[key].forEach(o => {
                    options.push(o);
                  });
                }
              });

              setSubcategoryStrOptions(options);
            }}
          >
            {subcategoryStrOptions.map(o => (
              <Option value={o}>{o}</Option>
            ))}
          </Select>,
        )}
      </Form.Item>
    </>
  );
};

export default CategorySelector;
