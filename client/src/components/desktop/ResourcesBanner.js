import React from 'react';
import { Layout, Row } from 'antd';
import PropTypes from 'prop-types';

import ResourceBreadcrumb from '../ResourcesBreadcrumb';

const { Header } = Layout;

function ResourcesBanner(props) {
  const { categorySelected, subcategorySelected } = props;

  return (
    <Header
      style={{
        backgroundImage: `linear-gradient(70deg, #431C72 0%, #8450c4 99%)`,
        color: 'white',
        height: 'auto',
        paddingLeft: '10%',
        paddingBottom: '0.5em',
      }}
    >
      <Row>
        {subcategorySelected != null ? (
          <ResourceBreadcrumb
            categorySelected={categorySelected}
            subcategorySelected={subcategorySelected}
          />
        ) : (
          <span>Saved Resources</span>
        )}
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
};

export default ResourcesBanner;
