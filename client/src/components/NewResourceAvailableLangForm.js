// @flow

import React, { useState } from 'react';
import { Form, Input, Button, List } from 'antd';
import StrListFormItem from './NewResourceStrListForm';

type FormItemProps = {
  availableLanguages: () => void,
  setAvailableLanguages: () => void,
  setTotalSubmitEnabled: () => void,
};

const AvailableLangFormItem = (props: FormItemProps) => {
  const {
    availableLanguages,
    setAvailableLanguages,
    setTotalSubmitEnabled,
  } = props;

  return (
    <StrListFormItem
      formName="availableLanguage"
      label="Available Language"
      placeholder="Available Language"
      listOfStrings={availableLanguages}
      setListOfStrings={setAvailableLanguages}
    />
  );
};

export default AvailableLangFormItem;
