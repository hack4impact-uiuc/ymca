// @flow

import React, { useState } from 'react';
import { AutoComplete } from 'antd';
import { HomeTwoTone } from '@ant-design/icons';
import searchLocation from '../utils/geocoding';

type Props = {
  setLocationValue: (string) => void,
  setLocationResults: (Array) => void,
};

function ResourceFilterAutofill(props: Props) {
  const { setLocationValue, setLocationResults } = props;

  const [autofillOptions, setAutofillOptions] = useState([]);

  const onLocationSearch = async (search) => {
    setLocationValue(search);
    if (search && search.length >= 2) {
      const results = await searchLocation(search);
      setLocationResults(results.features);
      setAutofillOptions(
        results.features.map((place, idx) => {
          const split = place.place_name.split(', ');
          split.pop();
          return { value: split.join(', ') };
        }),
      );
    } else {
      setLocationResults([]);
    }
  };

  return (
    <>
      <HomeTwoTone style={{ fontSize: '20px', marginRight: '5px' }} />
      <AutoComplete
        allowClear
        onChange={onLocationSearch}
        options={autofillOptions}
        placeholder="Enter your location here..."
        style={{ width: '200px' }}
      />
    </>
  );
}

export default ResourceFilterAutofill;
