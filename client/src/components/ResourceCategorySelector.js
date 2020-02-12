// @flow

import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';

import { getCategories } from '../utils/api';

const { Option, OptGroup } = Select;
export const CAT_SUB_SPLITTER = '~';

const wrappedSetCategory = args => {
  const { selected, setCategories, setSubcategories, setFieldsValue } = args;

  const selectedCategories = [];
  const selectedSubcategories = [];

  selected.forEach(optionValue => {
    const tokens = optionValue.split(CAT_SUB_SPLITTER);
    selectedCategories.push(tokens[0]);
    selectedSubcategories.push(tokens[1]);
  });

  setCategories(selectedCategories);
  setSubcategories(selectedSubcategories);

  setFieldsValue({});
};

type Props = {
  setCategories: (Array<String>) => void,
  setSubcategories: (Array<String>) => void,
  getFieldDecorator: () => any,
  setFieldsValue: () => any,
};

const CategorySelector = (props: Props) => {
  const {
    setCategories,
    setSubcategories,
    getFieldDecorator,
    setFieldsValue,
  } = props;

  const [fetchedCategories, setFetchedCategories] = useState([]);

  const onCategoryChange = selected => {
    wrappedSetCategory({
      selected,
      setCategories,
      setSubcategories,
      setFieldsValue,
    });
  };

  // fetch categories && subcategories
  useEffect(() => {
    getCategories().then(res => {
      if (res !== null) {
        if (res.code === 200) {
          setFetchedCategories(res.result);
        }
      }
    });
  }, []);

  return (
    <>
      <Form.Item label="Category">
        {getFieldDecorator('categorySelect', {
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
              <OptGroup key={cat.name} label={cat.name}>
                {cat.subcategories.map(subcat => {
                  const val = `${cat.name}${CAT_SUB_SPLITTER}${subcat}`;
                  return (
                    <Option key={val} value={val}>
                      {subcat}
                    </Option>
                  );
                })}
              </OptGroup>
            ))}
          </Select>,
        )}
      </Form.Item>
    </>
  );
};

export default CategorySelector;
