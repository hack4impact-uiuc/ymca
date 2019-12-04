// @flow

import React from 'react';
import { Redirect } from 'react-router-dom';

type Props = {
  authed: boolean,
  setAuthed: boolean => void,
};
const Logout = (props: Props) => {
  const { authed, setAuthed } = props;

  localStorage.removeItem('token');
  setAuthed(false);

  return <Redirect to="/" />;
};

export default Logout;
