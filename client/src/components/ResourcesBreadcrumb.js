import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/';

import '../css/ResourcesBreadcrumb.css';

function ResourcesBreadcrumb(props) {
  const { categorySelected, subcategorySelected } = props;

  const breadcrumbs = [];

  if (categorySelected === 'All Resources') {
    breadcrumbs.push(<span>All Resources</span>);
  } else if (categorySelected !== '') {
    breadcrumbs.push(
      <Link className="link" to="resources">
        <span>All Resources</span>
      </Link>,
    );
    if (subcategorySelected !== '') {
      breadcrumbs.push(
        <span>
          {` > `}
          <Link
            className="link"
            to={{
              pathname: '/resources',
              search: `?category=${categorySelected}`,
            }}
          >
            {categorySelected}
          </Link>
        </span>,
      );
      breadcrumbs.push(
        <span>
          {` > `}
          <strong>{subcategorySelected}</strong>
        </span>,
      );
    } else if (subcategorySelected !== '') {
      breadcrumbs.push(
        <span>
          {` > `}
          <Link
            className="link"
            to={{
              pathname: '/resources',
              search: `?category=${categorySelected}`,
            }}
          >
            {categorySelected}
          </Link>
        </span>,
      );
      breadcrumbs.push(
        <span>
          {` > `}
          <strong>{subcategorySelected}</strong>
        </span>,
      );
    } else {
      breadcrumbs.push(
        <span>
          {` > `}
          <strong>{categorySelected}</strong>
        </span>,
      );
    }
  }

  return breadcrumbs;
}

ResourcesBreadcrumb.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  subcategorySelected: PropTypes.string.isRequired,
};

export default ResourcesBreadcrumb;
