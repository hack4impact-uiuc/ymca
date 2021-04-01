import React from 'react';
import { Layout, Row } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { allResourcesMessage, savedResourcesMessage } from '../utils/messages';
import useWindowDimensions from '../utils/mobile';

import ResourceBreadcrumb from './ResourcesBreadcrumb';

const { Header } = Layout;

const ResourcesBanner = (props) => {
  const isMobile = useWindowDimensions()[1];
  return isMobile ? (
    <ResourcesBannerMobile {...props} />
  ) : (
    <ResourcesBannerDesktop {...props} />
  );
};

const getBannerTitle = (categorySelected) => {
  let bannerTitle = (
    <FormattedMessage
      id={`category-${categorySelected.replace(/\s/g, '')}`}
      defaultMessage={categorySelected}
    />
  );
  if (categorySelected === 'All Resources') {
    bannerTitle = <FormattedMessage {...allResourcesMessage} />;
  } else if (categorySelected === 'Saved Resources') {
    bannerTitle = <FormattedMessage {...savedResourcesMessage} />;
  }

  return bannerTitle;
};

function ResourcesBannerDesktop(props) {
  const { categorySelected, subcategorySelected } = props;

  return (
    <Header
      style={{
        backgroundImage: `linear-gradient(70deg, #431C72 0%, #8450c4 99%)`,
        color: 'white',
        height: 'auto',
        paddingLeft: '10%',
        paddingBottom: '0.5em',
      }}
    >
      <Row>
        {subcategorySelected != null ? (
          <ResourceBreadcrumb
            categorySelected={categorySelected}
            subcategorySelected={subcategorySelected}
          />
        ) : (
          <span>
            <FormattedMessage {...savedResourcesMessage} />
          </span>
        )}
      </Row>
      <Row>
        <h1 style={{ color: 'white' }}>{getBannerTitle(categorySelected)}</h1>
      </Row>
    </Header>
  );
}

ResourcesBannerDesktop.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  subcategorySelected: PropTypes.string.isRequired,
};

function ResourcesBannerMobile(props) {
  const { categorySelected, subcategorySelected } = props;

  return (
    <Header
      style={{
        backgroundImage: `linear-gradient(70deg, #431C72 0%, #8450c4 99%)`,
        backgroundSize: 'cover',
        width: '100%',
        color: 'white',
        height: '10em',
        paddingLeft: '10%',
        paddingTop: '2.5em',
      }}
    >
      <Row>
        {subcategorySelected != null ? (
          <ResourceBreadcrumb
            categorySelected={categorySelected}
            subcategorySelected={subcategorySelected}
          />
        ) : (
          <span>
            <FormattedMessage {...savedResourcesMessage} />
          </span>
        )}
      </Row>
      <Row>
        <h1 style={{ color: 'white', fontSize: '36px' }}>
          {getBannerTitle(categorySelected)}
        </h1>
      </Row>
    </Header>
  );
}

ResourcesBannerMobile.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  subcategorySelected: PropTypes.string.isRequired,
};

export default ResourcesBanner;
