import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/';
import { FormattedMessage } from 'react-intl';

import { allResourcesMessage } from '../utils/messages';

import '../css/ResourcesBreadcrumb.css';

function ResourcesBreadcrumb(props) {
  const {
    categorySelected,
    subcategorySelected,
    resourceSelected,
    tColor,
  } = props;
  const breadcrumbs = [];

  if (categorySelected === 'All Resources') {
    breadcrumbs.push(
      <span className="default-crumb" style={{ color: tColor }} key="all">
        <FormattedMessage {...allResourcesMessage} />
      </span>,
    );
  } else if (categorySelected !== '') {
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
    if (subcategorySelected !== '') {
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
              id={`category-${categorySelected?.replace(/\s/g, '')}`}
              defaultMessage={categorySelected}
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
                  `?category=${categorySelected}` +
                  `&subcategory=${subcategorySelected}`,
              }}
            >
              <FormattedMessage
                id={`subcategory-${subcategorySelected?.replace(/\s/g, '')}`}
                defaultMessage={subcategorySelected}
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
                id={`subcategory-${subcategorySelected?.replace(/\s/g, '')}`}
                defaultMessage={subcategorySelected}
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
              id={`category-${categorySelected?.replace(/\s/g, '')}`}
              defaultMessage={categorySelected}
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
  categorySelected: PropTypes.string.isRequired,
  subcategorySelected: PropTypes.string.isRequired,
  resourceSelected: PropTypes.string,
  tColor: PropTypes.string,
};

export default ResourcesBreadcrumb;
