import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/';

import '../css/ResourceBreadcrumb.css';

function ResourceBreadcrumb(props) {
  const { categorySelected, subcategorySelected } = props;

  const breadcrumbs = [];

  if (categorySelected === 'All Resources') {
    breadcrumbs.push(<span>All Resources</span>);
  } else if (categorySelected !== '') {
    breadcrumbs.push(
      <Link className="link" to="resources?category=All Resources">
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
    } else {
      breadcrumbs.push(
        <Link className="link" to="resources?category=All Resources">
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
      } else {
        breadcrumbs.push(
          <span>
            {` > `}
            <strong>{categorySelected}</strong>
          </span>,
        );
      }
    }
  }

  return breadcrumbs;
}

ResourceBreadcrumb.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  subcategorySelected: PropTypes.string.isRequired,
};

export default ResourceBreadcrumb;
