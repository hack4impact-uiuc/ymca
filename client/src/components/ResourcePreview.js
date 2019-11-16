import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

import '../css/ResourcePreview.css';

const { Meta } = Card;

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

  useEffect(() => {
    switch (subcategory) {
      case 'Abuse/Neglect':
        setSrc('/asset/subcategories/abuse.jpg');
        break;
      case 'Adult Education':
        setSrc('/asset/subcategories/adultEd.jpg');
        break;
      case 'Drugs/Alcohol':
        setSrc('/asset/subcategories/alcohol.jpg');
        break;
      case 'Animal Care':
        setSrc('/asset/subcategories/animalhealth.jpg');
        break;
      case 'Children Education':
        setSrc('/asset/subcategories/childEd.jpg');
        break;
      case 'Children':
        setSrc('/asset/subcategories/childhealth.jpg');
        break;
      case 'Clothing Assistance':
        setSrc('/asset/subcategories/clothing.jpg');
        break;
      case 'Community Information':
        setSrc('/asset/subcategories/community.jpg');
        break;
      case 'Dental':
        setSrc('/asset/subcategories/dentalhealth.jpg');
        break;
      case 'Employment':
        setSrc('/asset/subcategories/employment.jpg');
        break;
      case 'Vision':
        setSrc('/asset/subcategories/eyehealth.jpg');
        break;
      case 'Finance/Tax Assistance':
        setSrc('/asset/subcategories/financialtax.jpg');
        break;
      case 'Medical':
        setSrc('/asset/subcategories/medical.jpg');
        break;
      case 'Mental Health & Counseling':
        setSrc('/asset/subcategories/mentalhealth.jpg');
        break;
      case 'Students':
        setSrc('/asset/subcategories/studentfinance.jpg');
        break;
      default:
        setSrc(
          category === 'Citizenship'
            ? '/asset/subcategories/citizenship.jpg'
            : 'https://uiuc.hack4impact.org/static/images/team-cheer.jpg',
        );
        break;
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
  description.push(<div style={{ color: '#431C72' }}>{cost}</div>);
  description.push(<div style={{ color: 'black' }}>{city}</div>);
  description.push(<div style={{ color: 'black' }}>{languages}</div>);

  return (
    <Link to={`resources/${id}`}>
      <Card
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
        <Meta title={name} description={description} />
      </Card>
    </Link>
  );
}

ResourcePreview.propTypes = {
  availableLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subcategory: PropTypes.string.isRequired,
};

export default ResourcePreview;
