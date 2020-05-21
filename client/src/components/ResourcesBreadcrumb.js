import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/';

import '../css/ResourcesBreadcrumb.css';

function ResourcesBreadcrumb(props) {
  const { categorySelected, subcategorySelected, resourceSelected } = props;

  const breadcrumbs = [];

  if (categorySelected === 'All Resources') {
    breadcrumbs.push(<span key="all">All Resources</span>);
  } else if (categorySelected !== '') {
    breadcrumbs.push(
      <Link
        className="link"
        key="all"
        to={{
          pathname: '/resources',
        }}
      >
        <span>All Resources</span>
      </Link>,
    );
    if (subcategorySelected !== '') {
      breadcrumbs.push(
        <span key="cat">
          &nbsp;&gt;&nbsp;
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

      if (resourceSelected) {
        breadcrumbs.push(
          <span key="sub">
            &nbsp;&gt;&nbsp;
            <Link
              className="link"
              to={{
                pathname: '/resources',
                search:
                  `?category=${categorySelected}` +
                  `&subcategory=${subcategorySelected}`,
              }}
            >
              {subcategorySelected}
            </Link>
          </span>,
        );
        breadcrumbs.push(
          <span key="resource">
            &nbsp;&gt;&nbsp;
            <strong>{resourceSelected}</strong>
          </span>,
        );
      } else {
        breadcrumbs.push(
          <span key="sub">
            &nbsp;&gt;&nbsp;
            <strong>{subcategorySelected}</strong>
          </span>,
        );
      }
    } else {
      breadcrumbs.push(
        <span key="cat">
          &nbsp;&gt;&nbsp;
          <strong>{categorySelected}</strong>
        </span>,
      );
    }
  }

  return <>{breadcrumbs}</>;
}

ResourcesBreadcrumb.defaultProps = {
  resourceSelected: '',
};

ResourcesBreadcrumb.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  subcategorySelected: PropTypes.string.isRequired,
  resourceSelected: PropTypes.string,
};

export default ResourcesBreadcrumb;
