import React, { useEffect, useState } from 'react';
import { Layout, Row } from 'antd';
import PropTypes from 'prop-types';

import ResourceBreadcrumb from '../ResourcesBreadcrumb';

const { Header } = Layout;

const stockPhotos = {
  'Abuse/Neglect': '/asset/subcategories/abuse.jpg',
  'Adult Education': '/asset/subcategories/adultEd.jpg',
  'Animal Care': '/asset/subcategories/animalhealth.jpg',
  Children: '/asset/subcategories/childhealth.jpg',
  'Children Education': '/asset/subcategories/childEd.jpg',
  'Clothing Assistance': '/asset/subcategories/clothing.jpg',
  'Community Information': '/asset/subcategories/community.jpg',
  Dental: '/asset/subcategories/dentalhealth.jpg',
  'Drugs/Alcohol': '/asset/subcategories/alcohol.jpg',
  Employment: '/asset/subcategories/employment.jpg',
  'Finance/Tax Assistance': '/asset/subcategories/financialtax.jpg',
  Medical: '/asset/subcategories/medical.jpg',
  'Mental Health & Counseling': '/asset/subcategories/mentalhealth.jpg',
  Students: '/asset/subcategories/studentfinance.jpg',
  Vision: '/asset/subcategories/eyehealth.jpg',
};

function ResourcesBannerMobile(props) {
  const [src, setSrc] = useState('');
  const { categorySelected, subcategorySelected } = props;

  useEffect(() => {
    let found = false;
    if (stockPhotos[subcategorySelected]) {
      setSrc(stockPhotos[subcategorySelected]);
      found = true;
    }
    if (!found) {
      setSrc(
        categorySelected.includes('Citizenship')
          ? '/asset/subcategories/citizenship.jpg'
          : '/asset/subcategories/default.jpg',
      );
    }
  }, [categorySelected, setSrc, subcategorySelected]);

  return (
    <Header
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        width: '100%',
        color: 'white',
        height: '20em',
        paddingLeft: '10%',
        paddingTop: '12em',
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

ResourcesBannerMobile.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  subcategorySelected: PropTypes.string.isRequired,
};

export default ResourcesBannerMobile;
