import React from 'react';
import { Link } from 'react-router-dom/';
import { FormattedMessage } from 'react-intl';

export const loginMessage = (
  <>
    <FormattedMessage
      id="logInSave"
      defaultMessage="{loginLink} to save resources!"
      values={{
        loginLink: (
          <Link to="/login">
            <FormattedMessage id="logInSaveLinkText" defaultMessage="Log in" />
          </Link>
        ),
      }}
    />
  </>
);

export const savedMessage = (
  <FormattedMessage id="saveResource" defaultMessage="Save resource" />
);

export const unsavedMessage = (
  <FormattedMessage id="unsaveResource" defaultMessage="Unsave resource" />
);
