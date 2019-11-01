// @flow

import React from 'react';
import StrListFormItem from './NewResourceStrListForm';

type FormItemProps = {
  comments: Array<String>,
  setComments: () => void,
  setTotalSubmitEnabled: () => void,
};

const CommentsFormItem = (props: FormItemProps) => {
  const { comments, setComments, setTotalSubmitEnabled } = props;

  return (
    <StrListFormItem
      formName="commentForm"
      label="Comments"
      placeholder="Enter a comment"
      listOfStrings={comments}
      setListOfStrings={setComments}
      setTotalSubmitEnabled={setTotalSubmitEnabled}
    />
  );
};

export default CommentsFormItem;
