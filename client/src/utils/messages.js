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

export const detailMessages = defineMessages({
  noAddress: {
    id: 'detailNoAddress',
    defaultMessage: 'No address provided',
  },
  noWebsite: {
    id: 'detailNoWebsite',
    defaultMessage: 'No website provided',
  },
  noEmail: {
    id: 'detailNoEmail',
    defaultMessage: 'No email provided',
  },
  noPhoneNumber: {
    id: 'detailNoPhoneNumber',
    defaultMessage: 'No phone number provided',
  },
  noDescription: {
    id: 'detailNoDescription',
    defaultMessage: 'No description provided',
  },
  eligibility: {
    id: 'detailEligibility',
    defaultMessage: 'Eligibility Requirements',
  },
  basicInfo: {
    id: 'detailBasicInfo',
    defaultMessage: 'Basic Information',
  },
  requiredDoc: {
    id: 'detailRequiredDoc',
    defaultMessage: 'Required Documents',
  },
  noneProvided: {
    id: 'detailNoneProvided',
    defaultMessage: 'None provided',
  },
  languagesSpoken: {
    id: 'detailLanguagesSpoken',
    defaultMessage: 'Languages Spoken',
  },
  financialAid: {
    id: 'detailFinancialAid',
    defaultMessage: 'Financial Aid',
  },
  education: {
    id: 'detailEducation',
    defaultMessage: 'Education',
  },
  immigrationStatus: {
    id: 'detailImmigrationStatus',
    defaultMessage: 'Immigration Status',
  },
  deadline: {
    id: 'detailDeadline',
    defaultMessage: 'Deadline',
  },
  amount: {
    id: 'detailAmount',
    defaultMessage: 'Amount',
  },
  locationAndHours: {
    id: 'detailLocationAndHours',
    defaultMessage: 'Location and Hours',
  },
  openNow: {
    id: 'detailOpenNow',
    defaultMessage: 'Open now!',
  },
  noSchedule: {
    id: 'detailNoSchedule',
    defaultMessage: 'No schedule provided',
  },
  none: {
    id: 'detailNone',
    defaultMessage: 'None',
  },
  schedule: {
    id: 'detailSchedule',
    defaultMessage: 'Schedule',
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
