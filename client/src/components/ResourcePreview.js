import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon } from 'antd';
import { Link } from 'react-router-dom';

import '../css/ResourcePreview.css';
import useWindowDimensions from '../utils/mobile';
import { saveResource, deleteSavedResource } from '../utils/auth';

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
    authed,
    updateSaved,
  } = props;
  const [src, setSrc] = useState('');

  let { isSaved } = props;

  const saveResourceHandler = async (_e, _id) => {
    await saveResource(_id);
    isSaved = true;
    updateSaved();
  };

  const deleteResourceHandler = async (_e, _id) => {
    await deleteSavedResource(_id);
    isSaved = false;
    updateSaved();
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
  let descriptionText = '';
  if (cost && cost !== '') {
    descriptionText += `${cost} `;
  }
  if (city && city !== '') {
    if (descriptionText !== '') {
      descriptionText += '• ';
    }
    descriptionText += `${city} `;
  }
  if (languages && languages !== '') {
    if (descriptionText !== '') {
      descriptionText += '• ';
    }
    descriptionText += `${languages} `;
  }
  description.push(
    <div key="description" style={{ color: 'black' }}>
      {descriptionText}
    </div>,
  );

  return (
    <Link
      to={{
        pathname: `resources/${id}`,
      }}
    >
      <Card
        className="resource-preview-card"
        cover={
          <div className="resource-preview-cover">
            <img
              className="resource-preview-cover-img"
              alt={subcategory}
              src={src}
            />
          </div>
        }
      >
        {authed ? (
          <a onClick={e => e.preventDefault()}>
            {isSaved ? (
              <Button
                onClick={async e => {
                  await deleteResourceHandler(e, id);
                }}
              >
                <Icon type="star" theme="filled" style={{ fontSize: '16px' }} />
              </Button>
            ) : (
              <Button
                onClick={async e => {
                  await saveResourceHandler(e, id);
                }}
              >
                <Icon type="star" style={{ fontSize: '16px' }} />
              </Button>
            )}
          </a>
        ) : (
          <div />
        )}
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
  isSaved: PropTypes.bool.isRequired,
  authed: PropTypes.bool.isRequired,
  updateSaved: PropTypes.func.isRequired,
};

export default ResourcePreview;
