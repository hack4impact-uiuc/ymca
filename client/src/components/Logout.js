// @flow

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

type Props = {
  authed: Boolean,
  setAuthed: Boolean => void,
};
const Logout = (props: Props) => {
  const { authed, setAuthed } = props;

  localStorage.removeItem('token');
  setAuthed(false);

  return <Redirect to="/" />;
};

export default Logout;
