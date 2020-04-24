import React from 'react';
import { Layout, Row } from 'antd';
import PropTypes from 'prop-types';

import ResourceBreadcrumb from '../ResourcesBreadcrumb';

const { Header } = Layout;

function ResourcesBannerMobile(props) {
  const { categorySelected, subcategorySelected } = props;

  return (
    <Header
      style={{
        backgroundImage: `linear-gradient(70deg, #431C72 0%, #8450c4 99%)`,
        backgroundSize: 'cover',
        width: '100%',
        color: 'white',
        height: '10em',
        paddingLeft: '10%',
        paddingTop: '2.5em',
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
        <h1 style={{ color: 'white', fontSize: '36px' }}>{categorySelected}</h1>
      </Row>
    </Header>
  );
}

ResourcesBannerMobile.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  subcategorySelected: PropTypes.string.isRequired,
};

export default ResourcesBannerMobile;
