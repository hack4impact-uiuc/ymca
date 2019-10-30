import React from 'react';
import { Layout, Row } from 'antd';
import ResourceBreadcrumb from './ResourceBreadcrumb';

const { Header } = Layout;

function FilterHeader(props) {
  const { categorySelected, subcategorySelected } = props;

  return (
    <Header
      style={{
        background: '#431C72',
        color: 'white',
        height: 'auto',
        paddingBottom: '16px',
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

export default FilterHeader;
