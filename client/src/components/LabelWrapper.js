// @flow
import React, { useState, useEffect } from 'react';

type LabelWrapperProps = {
  label: String,
  required: any,
  component: any => any,
};

const LabelWrapper = (props: LabelWrapperProps) => {
  const { label, required, component } = props;

  return (
    <div>
      <span>
        <label htmlFor="input">{label}</label>
        {(required !== undefined && '*') || null}
      </span>

      {component}
    </div>
  );
};

export default LabelWrapper;
