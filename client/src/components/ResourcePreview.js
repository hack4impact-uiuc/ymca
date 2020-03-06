import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon } from 'antd';
import { Link } from 'react-router-dom';

import '../css/ResourcePreview.css';
import useWindowDimensions from '../utils/mobile';
// import { saveResource } from '../utils/api';

const { Meta } = Card;

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

function ResourcePreview(props) {
  const {
    availableLanguages,
    category,
    cost,
    id,
    city,
    name,
    subcategory,
  } = props;
  const [src, setSrc] = useState('');
  const isMobile = useWindowDimensions()[1];

  const saveResource = async (_e, _id) => {
    console.log('Jackie');
    // e.stopPropagation();
    // await saveResource(id);
  };

  useEffect(() => {
    let found = false;
    subcategory.forEach(sub => {
      if (stockPhotos[sub]) {
        setSrc(stockPhotos[sub]);
        found = true;
      }
    });

    if (!found) {
      setSrc(
        category.includes('Citizenship')
          ? '/asset/subcategories/citizenship.jpg'
          : 'https://uiuc.hack4impact.org/static/images/team-cheer.jpg',
      );
    }
  }, [category, setSrc, subcategory]);

  const description = [];
  let languages = '';
  availableLanguages.forEach(language => {
    languages += `${language}, `;
  });
  if (languages !== '') {
    languages = languages.slice(0, languages.length - 2);
  }
  description.push(
    <div key="cost" style={{ color: '#431C72' }}>
      {cost}
    </div>,
  );
  description.push(
    <div key="city" style={{ color: 'black' }}>
      {city}
    </div>,
  );
  description.push(
    <div key="languages" style={{ color: 'black' }}>
      {languages}
    </div>,
  );

  return (
    <Link to={`resources/${id}`}>
      <Card
        className="resource-preview-card"
        cover={
          !isMobile && (
            <div className="resource-preview-cover">
              <img
                className="resource-preview-cover-img"
                alt={subcategory}
                src={src}
              />
            </div>
          )
        }
      >
        <a onClick={e => e.preventDefault()}>
          <Button
            onClick={async e => {
              await saveResource(e, id);
            }}
          >
            <Icon type="star" style={{ fontSize: '16px' }} />
          </Button>
        </a>
        <Meta title={name} description={description} />
      </Card>
    </Link>
  );
}

ResourcePreview.propTypes = {
  availableLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subcategory: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ResourcePreview;
