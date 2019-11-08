import React from 'react';
import { Layout, Row } from 'antd';
import PropTypes from 'prop-types';

import ResourceBreadcrumb from './ResourcesBreadcrumb';

const { Header } = Layout;

function ResourcesBanner(props) {
  const { categorySelected, subcategorySelected } = props;

  // const style = {
  //   background: '#431C72',
  //   color: resourceSelected.length > 0 ? 'black' : 'white',
  //   height: 'auto',
  //   paddingLeft: '235px',
  //   paddingBottom: '3em',
  //   paddingTop: '2em',
  // }

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

ResourcesBanner.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  subcategorySelected: PropTypes.string.isRequired,
  resourceSelected: PropTypes.string.isRequired,
};

export default ResourcesBanner;
