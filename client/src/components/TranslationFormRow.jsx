// @flow

import { React, useState, useEffect } from 'react';

import { Input, Checkbox } from 'antd';

import '../css/EditTranslations.css';

const { TextArea } = Input;

const TranslationFormRow = ({
  onChangeText,
  onCheck,
  translationId,
  text,
  translation,
  isVerified,
}) => {
  const [firstCol, setFirstCol] = useState('');

  useEffect(() => {
    function firstColumn() {
      if (translationId.indexOf('resource-description') !== -1) {
        setFirstCol('Resource Description');
      } else if (
        translationId.indexOf('resource-eligibilityRequirements-') !== -1
      ) {
        setFirstCol('Resource Eligibility');
      } else if (translationId.indexOf('resource-phoneType-') !== -1) {
        setFirstCol('Phone Type');
      } else if (translationId.indexOf('resource-financialAid-') !== -1) {
        setFirstCol('Financial Aid');
      } else if (translationId.indexOf('resource-requiredDoc-') !== -1) {
        setFirstCol('Required Documents');
      } else if (translationId.indexOf('category-') !== -1) {
        setFirstCol('Categories');
      } else if (translationId.indexOf('subcategory-') !== -1) {
        setFirstCol('Subcategories');
      } else if (translationId.indexOf('testimonial-') !== -1) {
        setFirstCol('Testimonials');
      } else {
        setFirstCol('none');
      }
    }

    firstColumn();
  }, [translationId]);

  return (
    <div className="translation-container">
      <div className="resource-description">{firstCol}</div>
      <div className="text-to-translate">{text}</div>
      <div className="translation-input">
        <TextArea
          autoSize
          onChange={(e) => onChangeText(translationId, e.target.value)}
          value={translation}
        />
      </div>
      <Checkbox
        defaultChecked={isVerified}
        onChange={(e) => onCheck(translationId, e.target.checked)}
        className="checkbox-translation"
      />
    </div>
  );
};

export default TranslationFormRow;
