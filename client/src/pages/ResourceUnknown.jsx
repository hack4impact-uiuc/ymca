// @flow

import React from 'react';
import { FormattedMessage } from 'react-intl';

function ResourceUnknown(): React$Element<'div'> {
  return (
    <div>
      <FormattedMessage
        id="resourceUnknown"
        defaultMessage="Resource is unknown! Try again!"
      />
    </div>
  );
}

export default ResourceUnknown;
