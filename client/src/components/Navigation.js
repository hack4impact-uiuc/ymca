// @flow

import React from 'react';

import useWindowDimensions from '../utils/mobile';

import NavMobile from './mobile/NavigationMobile';
import NavDesktop from './desktop/NavigationDesktop';

type Props = {
  authed: Boolean,
  authRoleIsEquivalentTo: String => void,
};

const Navigation = (props: Props) => {
  const { authed, authRoleIsEquivalentTo } = props;

  const isMobile = useWindowDimensions()[1];

  const desktop = (
    <NavDesktop
      authed={authed}
      authRoleIsEquivalentTo={authRoleIsEquivalentTo}
    />
  );
  const mobile = (
    <NavMobile
      authed={authed}
      authRoleIsEquivalentTo={authRoleIsEquivalentTo}
    />
  );

  return isMobile ? mobile : desktop;
};

export default Navigation;
