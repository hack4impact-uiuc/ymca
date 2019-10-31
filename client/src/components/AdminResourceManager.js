import React, { useState } from 'react';
import '../css/AdminResourceManager.css';
import NewResourceForm from './NewResourceForm';

const AdminResourceManager = () => {
  return (
    <>
      <NewResourceForm className="adminNewResourceForm" />
    </>
  );
};

export default AdminResourceManager;
