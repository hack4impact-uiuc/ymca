import { defineMessage, defineMessages } from 'react-intl';

export const filterMessages = defineMessages({
  cost: {
    id: 'filterCost',
    defaultMessage: 'Cost',
  },
  language: {
    id: 'filterLanguage',
    defaultMessage: 'Language',
  },
  location: {
    id: 'filterLocation',
    defaultMessage: 'Location',
  },
  apply: {
    id: 'filterApply',
    defaultMessage: 'Apply Filters',
  },
  sort: {
    id: 'filterSort',
    defaultMessage: 'Sort By',
  },
  languagesOffered: {
    id: 'filterLanguagesOffered',
    defaultMessage: 'Languages Offered',
  },
  free: {
    id: 'filterFree',
    defaultMessage: 'Free',
  },
  name: {
    id: 'filterName',
    defaultMessage: 'Name',
  },
});

export const loginMessages = defineMessages({
  pleaseInputYourEmail: {
    id: 'pleaseInputYourEmail',
    defaultMessage: 'Please input your E-mail!',
  },
  email: {
    id: 'email',
    defaultMessage: 'E-mail',
  },
});

export const allResourcesMessage = defineMessage({
  id: 'allResources',
  defaultMessage: 'All Resources',
});

export const savedResourcesMessage = defineMessage({
  id: 'savedResources',
  defaultMessage: 'Saved Resources',
});
