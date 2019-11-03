import React from 'react';
import { Layout, Row } from 'antd';
import PropTypes from 'prop-types';

import ResourceBreadcrumb from './ResourceBreadcrumb';

const { Header } = Layout;

function ResourceViewHeader(props) {
  const { categorySelected, subcategorySelected } = props;

  return (
    <Header
      style={{
        background: '#431C72',
        color: 'white',
        height: 'auto',
        paddingLeft: '235px',
        paddingBottom: '3em',
        paddingTop: '2em',
      }}
    >
      <Row>
        <ResourceBreadcrumb
          categorySelected={categorySelected}
          subcategorySelected={subcategorySelected}
        />
      </Row>
      <Row>
        <h1 style={{ color: 'white' }}>{categorySelected}</h1>
      </Row>
    </Header>
  );
}

ResourceViewHeader.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  subcategorySelected: PropTypes.string.isRequired,
};

export default ResourceViewHeader;
