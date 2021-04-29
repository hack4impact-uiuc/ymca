// @flow

import React from 'react';

import { Input, Checkbox } from 'antd';

import '../css/EditTranslations.css';

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
const TranslationFormRow = () => (
  <div className="translation-container">
    <div className="resource-description">Resource Descriptions</div>
    <div className="text-to-translate">
      Assist with insurance applications, community care applications, and
      general orientation of the health care system.
    </div>
    <div className="translation-input">
      <Input placeholder="Translation" />
    </div>
    <Checkbox onChange={onChange} className="checkbox-translation" />
  </div>
);

export default TranslationFormRow;
