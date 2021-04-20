import React, { useState } from 'react';
import { AutoComplete } from 'antd';
import { HomeTwoTone } from '@ant-design/icons';
import searchLocation from '../utils/geocoding';

function ResourcesMap() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [autofillOptions, setAutofillOptions] = useState([]);

  const onLocationSearch = async (search) => {
    setSearchValue(search);
    if (search && search.length >= 2) {
      const results = await searchLocation(search);
      setSearchResults(results.features);
      setAutofillOptions(
        results.features.map((place, idx) => {
          const split = place.place_name.split(', ');
          split.pop();
          return { value: split.join(', ') };
        }),
      );
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div>
      Map
      <br />
      <HomeTwoTone style={{ fontSize: '20px', marginRight: '5px' }} />
      <AutoComplete
        allowClear
        onChange={onLocationSearch}
        options={autofillOptions}
        placeholder="Enter your location here..."
        style={{ width: '200px' }}
      />
    </div>
  );
}

export default ResourcesMap;
