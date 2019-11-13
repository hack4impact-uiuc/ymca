// @flow

import React from 'react';

import '../css/AdminResourceManager.css';
import ResourceForm from './ResourceForm';

type Props = {
  match: {
    params: {
      id: number,
    },
  },
};

const AdminResourceManager = (props: Props) => {
  return (
    <>
      <ResourceForm
        className="adminNewResourceForm"
        id={props.match.params.id}
      />
    </>
  );
};

export default AdminResourceManager;
