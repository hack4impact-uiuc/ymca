// @flow

import React, { useState } from 'react';
import { Input } from 'reactstrap';

type Props = {|
  setSubmitEnabled: () => void,
  setTotalSubmitEnabled: () => void,
|};

const onFocus = (e, state) => {
  state.setTotalSubmitEnabled(false);
  state.setSubmitEnabled(true);
};

const onBlur = (e, state) => {
  state.setTotalSubmitEnabled(true);
  state.setSubmitEnabled(false);
};

export default class AdminNewResourceInternalFormInput extends Input {
  constructor(props: Props) {
    props.onFocus = onFocus;
    props.onBlur = onBlur;

    super(props);

    const { setSubmitEnabled, setTotalSubmitEnabled } = props;

    this.state = {
      setSubmitEnabled,
      setTotalSubmitEnabled,
    };
  }
}
