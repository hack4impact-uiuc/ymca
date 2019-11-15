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
    <div className="admin-resource-form">
      <ResourceForm id={props.match.params.id} />
    </div>
  );
};

export default AdminResourceManager;
