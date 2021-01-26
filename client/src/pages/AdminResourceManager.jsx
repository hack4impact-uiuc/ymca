// @flow

import React from 'react';

import '../css/AdminResourceManager.css';
import ResourceForm from '../components/ResourceForm';

type Props = {
  match: {
    params: {
      id: number,
    },
  },
};

const AdminResourceManager = (props: Props): React$Element<'div'> => {
  const { match } = props;

  return (
    <div className="admin-resource-form">
      <ResourceForm id={match.params.id} />
    </div>
  );
};

export default AdminResourceManager;
