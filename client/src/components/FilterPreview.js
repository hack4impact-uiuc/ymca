import React, { Component } from 'react';
import '../css/FilterPreview.css';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

function FilterPreview(props) {
  const { id, resource } = props;

  let description = [];
  let languages = '';
  resource.availableLanguages.forEach(language => {
    languages += `${language}, `;
  });
  if (languages !== '') {
    languages = languages.slice(0, languages.length - 2);
  }
  description.push(
    <div style={{ color: '#431C72' }}>{resource.cost}</div>,
  );
  description.push(<div style={{ color: 'black' }}>{languages}</div>);

  return (
    <Link to={`resource/${id}`}>
      <Card
        cover={
          <img src="https://storage.googleapis.com/burbcommunity-morethanthecurve/2013/10/ymca-logo.jpg" />
        }
      >
        <Meta title={resource.name} description={description} />
      </Card>
    </Link>
  );
}

export default FilterPreview;
