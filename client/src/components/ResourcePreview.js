import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

import '../css/ResourcePreview.css';
import { saveResource, deleteSavedResource } from '../utils/auth';
import determineStockPhoto from '../utils/determineStockPhoto';

import SaveButton from './SaveButton';

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
    isSaved,
    authed,
    updateSaved,
    image,
  } = props;
  const [src, setSrc] = useState('');
  const [hover, setHover] = useState(false);

  const saveResourceHandler = async () => {
    await saveResource(id);
    updateSaved();
  };

  const deleteResourceHandler = async () => {
    await deleteSavedResource(id);
    updateSaved();
  };

  useEffect(() => {
    setSrc(determineStockPhoto(category, subcategory));
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
      className="resource-preview-text"
    >
      <Card
        className="resource-preview-border"
        cover={
          <img
            className="resource-preview-cover-img"
            alt={subcategory}
            src={image !== '' ? image : src}
          />
        }
        bordered={hover}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Meta
          title={
            <>
              <div className="resource-preview-name">{name}</div>
              <div style={{ float: 'right' }}>
                <SaveButton
                  authed={authed}
                  isSaved={isSaved}
                  deleteResourceHandler={deleteResourceHandler}
                  saveResourceHandler={saveResourceHandler}
                />
              </div>
            </>
          }
          description={description}
          style={{ marginLeft: '-1em' }}
        />
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
  image: PropTypes.string.isRequired,
};

export default ResourcePreview;
