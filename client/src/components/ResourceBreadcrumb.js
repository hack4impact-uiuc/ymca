import React from 'react';
import PropTypes from 'prop-types';

function ResourceBreadcrumb(props) {
  const { categorySelected, subcategorySelected, resource } = props;

  const breadcrumbs = [];
  breadcrumbs.push(<span>All Resources</span>);
  if (categorySelected !== '') {
    if (subcategorySelected !== '') {
      breadcrumbs.push(<span>{` > ${categorySelected}`}</span>);

      if (resource !== '') {
        breadcrumbs.push(<span>{` > ${subcategorySelected}`}</span>);
        breadcrumbs.push(
          <span>
            {` > `}
            <strong>{resource}</strong>
          </span>,
        );
      } else {
        breadcrumbs.push(
          <span>
            {` > `}
            <strong>{subcategorySelected}</strong>
          </span>,
        );
      }
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

ResourceBreadcrumb.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  subcategorySelected: PropTypes.string.isRequired,
  resource: PropTypes.string
};

export default ResourceBreadcrumb;
