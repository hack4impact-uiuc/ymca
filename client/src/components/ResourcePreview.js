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
    if (subcategory.includes('Abuse/Neglect')) {
      setSrc('/asset/subcategories/abuse.jpg');
    } else if (subcategory.includes('Adult Education')) {
      setSrc('/asset/subcategories/adultEd.jpg');
    } else if (subcategory.includes('Drugs/Alcohol')) {
      setSrc('/asset/subcategories/alcohol.jpg');
    } else if (subcategory.includes('Animal Care')) {
      setSrc('/asset/subcategories/animalhealth.jpg');
    } else if (subcategory.includes('Children Education')) {
      setSrc('/asset/subcategories/childEd.jpg');
    } else if (subcategory.includes('Children')) {
      setSrc('/asset/subcategories/childhealth.jpg');
    } else if (subcategory.includes('Clothing Assistance')) {
      setSrc('/asset/subcategories/clothing.jpg');
    } else if (subcategory.includes('Community Information')) {
      setSrc('/asset/subcategories/community.jpg');
    } else if (subcategory.includes('Dental')) {
      setSrc('/asset/subcategories/dentalhealth.jpg');
    } else if (subcategory.includes('Employment')) {
      setSrc('/asset/subcategories/employment.jpg');
    } else if (subcategory.includes('Vision')) {
      setSrc('/asset/subcategories/eyehealth.jpg');
    } else if (subcategory.includes('Finance/Tax Assistance')) {
      setSrc('/asset/subcategories/financialtax.jpg');
    } else if (subcategory.includes('Medical')) {
      setSrc('/asset/subcategories/medical.jpg');
    } else if (subcategory.includes('Mental Health & Counseling')) {
      setSrc('/asset/subcategories/mentalhealth.jpg');
    } else if (subcategory.includes('Students')) {
      setSrc('/asset/subcategories/studentfinance.jpg');
    } else {
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
  category: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subcategory: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ResourcePreview;
