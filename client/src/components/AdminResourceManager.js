import React, { useState } from 'react';
import '../css/AdminResourceManager.css';

import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import AppNavbar from './AppNavbar';
import AdminNewResourceForm from './AdminNewResourceForm';

const AdminResourceManager = () => {
  return (
    <>
      <AppNavbar />
      <AdminNewResourceForm className="adminNewResourceForm" />
    </>
  );
};

export default AdminResourceManager;
