// @flow

import React from 'react';
import StrListFormItem from './NewResourceStrListForm';

type FormItemProps = {
  internalNotes: Array<String>,
  setInternalNotes: () => void,
  setTotalSubmitEnabled: () => void,
};

const InternalNotesFormItem = (props: FormItemProps) => {
  const { internalNotes, setInternalNotes, setTotalSubmitEnabled } = props;

  return (
    <StrListFormItem
      formName="internalNotesForm"
      label="Internal Notes"
      placeholder="Enter a note..."
      listOfStrings={internalNotes}
      setListOfStrings={setInternalNotes}
      setTotalSubmitEnabled={setTotalSubmitEnabled}
    />
  );
};

export default InternalNotesFormItem;
