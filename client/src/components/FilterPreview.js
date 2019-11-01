import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

function FilterPreview(props) {
  const { availableLanguages, cost, id, name } = props;

  const description = [];
  let languages = '';
  availableLanguages.forEach(language => {
    languages += `${language}, `;
  });
  if (languages !== '') {
    languages = languages.slice(0, languages.length - 2);
  }
  description.push(<div style={{ color: '#431C72' }}>{cost}</div>);
  description.push(<div style={{ color: 'black' }}>{languages}</div>);

  return (
    <Link to={`resources/${id}`}>
      <Card
        cover={
          <img
            alt="ymca"
            src="https://uiuc.hack4impact.org/static/images/team-cheer.jpg"
          />
        }
      >
        <Meta title={name} description={description} />
      </Card>
    </Link>
  );
}

FilterPreview.propTypes = {
  availableLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  cost: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FilterPreview;
