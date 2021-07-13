import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/';
import { FormattedMessage } from 'react-intl';

import { allResourcesMessage } from '../utils/messages';

import '../css/ResourcesBreadcrumb.css';

function ResourcesBreadcrumb(props) {
  const { categorySelected, subcategorySelected, resourceSelected, tColor } =
    props;
  const breadcrumbs = [];

  if (categorySelected.name === 'All Resources') {
    breadcrumbs.push(
      <span className="default-crumb" style={{ color: tColor }} key="all">
        <FormattedMessage {...allResourcesMessage} />
      </span>,
    );
  } else if (categorySelected.name !== '') {
    breadcrumbs.push(
      <Link
        className="link"
        key="all"
        to={{
          pathname: '/resources',
        }}
      >
        <span style={{ color: tColor }}>
          <FormattedMessage {...allResourcesMessage} />
        </span>
      </Link>,
    );
    if (subcategorySelected.name !== '') {
      breadcrumbs.push(
        <span key="cat">
          &nbsp;&gt;&nbsp;
          <Link
            className="link"
            style={{ color: tColor }}
            to={{
              pathname: '/resources',
              search: `?category=${categorySelected}`,
            }}
          >
            <FormattedMessage
              id={`category-${categorySelected._id}`}
              defaultMessage={categorySelected.name}
            />
          </Link>
        </span>,
      );

      if (resourceSelected) {
        breadcrumbs.push(
          <span key="sub">
            &nbsp;&gt;&nbsp;
            <Link
              className="link"
              style={{ color: tColor }}
              to={{
                pathname: '/resources',
                search:
                  `?category=${categorySelected.name}` +
                  `&subcategory=${subcategorySelected.name}`,
              }}
            >
              <FormattedMessage
                id={`subcategory-${subcategorySelected._id}`}
                defaultMessage={subcategorySelected.name}
              />
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
          <span style={{ color: tColor }} key="sub">
            &nbsp;&gt;&nbsp;
            <strong>
              <FormattedMessage
                id={`subcategory-${subcategorySelected._id}`}
                defaultMessage={subcategorySelected.name}
              />
            </strong>
          </span>,
        );
      }
    } else {
      breadcrumbs.push(
        <span key="cat">
          &nbsp;&gt;&nbsp;
          <strong>
            <FormattedMessage
              style={{ color: tColor }}
              id={`category-${categorySelected._id}`}
              defaultMessage={categorySelected.name}
            />
          </strong>
        </span>,
      );
    }
  }

  return <>{breadcrumbs}</>;
}

ResourcesBreadcrumb.defaultProps = {
  resourceSelected: '',
  tColor: '#FFFFFF',
};

ResourcesBreadcrumb.propTypes = {
  categorySelected: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  subcategorySelected: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  resourceSelected: PropTypes.string,
  tColor: PropTypes.string,
};

export default ResourcesBreadcrumb;
