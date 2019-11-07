import React from 'react';
import { Layout, Row } from 'antd';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group'

import ResourceBreadcrumb from './ResourcesBreadcrumb';

const { Header } = Layout;

function ResourcesBanner(props) {
  const { categorySelected, isSmallHeader, subcategorySelected } = props;
  console.log(isSmallHeader)
  const header = isSmallHeader ? <h3 key="1" style={{ color: 'white' }}><ResourceBreadcrumb
    categorySelected={categorySelected}
    subcategorySelected={subcategorySelected}
  /></h3> : <div key="2"><Row>
    <ResourceBreadcrumb
      categorySelected={categorySelected}
      subcategorySelected={subcategorySelected}
    />
  </Row>
      <Row>
        <h1 style={{ color: 'white' }}>{categorySelected}</h1>
      </Row></div>
  const transitionOptions = {
    transitionName: "fade",
    transitionEnterTimeout: 200,
    transitionLeaveTimeout: 200
  }
  return (
    <Header
      style={{
        background: '#431C72',
        color: 'white',
        height: 'auto',
        paddingLeft: '235px',
        paddingBottom: '2em',
        paddingTop: '2em',
        transition: '1s',
      }}
    >
      <CSSTransitionGroup {...transitionOptions}>
        {header}
      </CSSTransitionGroup>
    </Header>
  );
}

ResourcesBanner.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  subcategorySelected: PropTypes.string.isRequired,
};

export default ResourcesBanner;
