// @flow

import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { filterMessages } from '../utils/messages';
import '../css/ResourcePreview.css';
import { saveResource, deleteSavedResource } from '../utils/auth';
import determineStockPhoto from '../utils/determineStockPhoto';
import languageConversion from '../utils/languages';

import SaveButton from './SaveButton';

const { Meta } = Card;

type Props = {
  availableLanguages: Array<string>,
  category: Array<string>,
  city: string,
  cost: string,
  id: string,
  name: string,
  subcategory: Array<string>,
  isSaved: boolean,
  updateSaved: () => void,
  image: string,
  description: string,
};

function ResourcePreview(props: Props) {
  const {
    availableLanguages,
    category,
    cost,
    id,
    city,
    name,
    subcategory,
    isSaved,
    updateSaved,
    image,
    description,
  } = props;
  const intl = useIntl();
  const [src, setSrc] = useState('');

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

  let descriptionText = '';
  if (description && description !== '') {
    descriptionText += `${intl.formatMessage({
      id: `resource-description-${id}`,
      defaultMessage: description,
    })} `;
  }
  let languages = '';
  availableLanguages.forEach((language) => {
    languages += `${languageConversion[language]}, `;
  });
  if (languages !== '') {
    languages = languages.slice(0, languages.length - 2);
  }
  let resourceInfoText = '';
  if (cost && cost !== '') {
    if (cost === 'Free') {
      resourceInfoText += `${intl.formatMessage(filterMessages.free)} `;
    } else {
      resourceInfoText += `${cost} `;
    }
  }
  if (city && city !== '') {
    if (resourceInfoText !== '') {
      resourceInfoText += '• ';
    }
    resourceInfoText += `${city} `;
  }
  if (languages && languages !== '') {
    if (resourceInfoText !== '') {
      resourceInfoText += '• ';
    }
    resourceInfoText += `${languages} `;
  }

  const descriptions = (
    <>
      <div className="resource-preview-description">{descriptionText}</div>
      <div className="resource-preview-footer">
        <div key="resourceInfo" className="resource-preview-info">
          {resourceInfoText}
        </div>
        <SaveButton
          isSaved={isSaved}
          deleteResourceHandler={deleteResourceHandler}
          saveResourceHandler={saveResourceHandler}
        />
      </div>
    </>
  );
  return (
    <Link
      to={{
        pathname: `resources/${id}`,
      }}
      className="resource-preview-text"
    >
      <Card className="resource-preview-border">
        <Meta
          title={
            <>
              <div className="resource-preview-header">
                <img
                  className="resource-preview-cover-img"
                  alt={subcategory}
                  src={image !== '' ? image : src}
                />
                <div className="resource-preview-name">{name}</div>
              </div>
            </>
          }
          description={descriptions}
          style={{ marginLeft: '-1em' }}
        />
      </Card>
    </Link>
  );
}

export default ResourcePreview;
