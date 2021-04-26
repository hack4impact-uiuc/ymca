// @flow

import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { HomeTwoTone } from '@ant-design/icons';
import searchLocation from '../utils/geocoding';

type Props = {
  setLocationValue: (string) => void,
  setLocationResult: (Array) => void,
};

function ResourceFilterAutofill(props: Props) {
  const { setLocationValue, setLocationResult } = props;

  const [autofillOptions, setAutofillOptions] = useState([]);
  const [autofillResults, setAutofillResults] = useState([]);

  const onLocationSearch = async (search) => {
    setLocationValue(search);
    if (search && search.length >= 2) {
      const results = await searchLocation(search);
      setAutofillResults(results.features);
      setAutofillOptions(
        results.features.map((place) => {
          const split = place.place_name.split(', ');
          split.pop();
          return { value: split.join(', ') };
        }),
      );
    }
  };

  const onLocationSelect = (selected) => {
    let idx = -1;
    for (let i = 0; i < autofillOptions.length; i += 1) {
      if (autofillOptions[i].value === selected) idx = i;
    }
    setLocationResult(autofillResults[idx]);
  };

  return (
    <>
      <HomeTwoTone style={{ fontSize: '20px', marginRight: '5px' }} />
      <AutoComplete
        allowClear
        onChange={onLocationSearch}
        onSelect={onLocationSelect}
        options={autofillOptions}
        placeholder="Enter your location here..."
        style={{ width: '15em' }}
      >
        <Input />
      </AutoComplete>
    </>
  );
}

export default ResourceFilterAutofill;
