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
import NewResourceForm from './NewResourceForm';

const AdminResourceManager = () => {
  return (
    <>
      <NewResourceForm className="adminNewResourceForm" />
    </>
  );
};

export default AdminResourceManager;
