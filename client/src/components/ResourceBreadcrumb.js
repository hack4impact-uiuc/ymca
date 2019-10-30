import React from 'react';

function ResourceBreadcrumb(props) {
  const { categorySelected, subcategorySelected } = props;

  let breadcrumbs = [];
  breadcrumbs.push(<span>All Resources</span>);
  if (categorySelected !== '') {
    if (subcategorySelected !== '') {
      breadcrumbs.push(<span>{` > ${categorySelected}`}</span>);
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

export default ResourceBreadcrumb;
