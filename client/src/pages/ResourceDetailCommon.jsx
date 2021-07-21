// @flow

import React from 'react';

import useWindowDimensions from '../utils/mobile';

import ResourceDetail from '../components/desktop/ResourceDetail';
import ResourceDetailMobile from '../components/mobile/ResourceDetailMobile';

type Props = {
  match: {
    params: {
      id: any,
    },
  },
  history: any,
};

const ResourceDetailCommon = (props: Props) => {
  const isMobile = useWindowDimensions()[1];

  return isMobile ? (
    <ResourceDetailMobile {...props} />
  ) : (
    <ResourceDetail {...props} />
  );
};

export default ResourceDetailCommon;
