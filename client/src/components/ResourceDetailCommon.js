// @flow

import React from 'react';

import ResourceDetail from '../pages/ResourceDetail';
import useWindowDimensions from '../utils/mobile';

import ResourceDetailMobile from './mobile/ResourceDetailMobile';

type Props = {
  authed: Boolean,
  authRoleIsEquivalentTo: String => Boolean,
  match: {
    params: {
      id: any,
    },
  },
};
const ResourceDetailCommon = (props: Props) => {
  const isMobile = useWindowDimensions()[1];

  if (isMobile) {
    return <ResourceDetailMobile {...props} />;
  }
  return <ResourceDetail {...props} />;
};

export default ResourceDetailCommon;
