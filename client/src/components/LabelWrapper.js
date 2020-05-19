// @flow
import React from 'react';

// type LabelWrapperProps = {
//   label: String,
//   required: any,
//   component: any => any,
// };

const LabelWrapper = (props: LabelWrapperProps) => {
  const { label, required, component } = props;

  return (
    <>
      <span style={{ color: '#6bdbd0' }}>
        <label htmlFor="input" style={{ color: '#492179' }}>
          {label}
        </label>
        {(required !== undefined && '*') || null}
      </span>

      {component}
    </>
  );
};

export default LabelWrapper;
