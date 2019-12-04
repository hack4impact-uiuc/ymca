// @flow

import React from 'react';
import { Redirect } from 'react-router-dom';

type Props = {
  setAuthRole: String => void,
  setAuthed: boolean => void,
};
const Logout = (props: Props) => {
  const { setAuthed, setAuthRole } = props;

  localStorage.removeItem('token');
  setAuthed(false);
  setAuthRole('');

  return <Redirect to="/" />;
};

export default Logout;
