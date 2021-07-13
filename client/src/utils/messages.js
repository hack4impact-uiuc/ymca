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
  lastUpdated: {
    id: 'lastUpdated',
    defaultMessage: 'Last updated',
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
  confirmPassword: {
    id: 'confirmPassword',
    defaultMessage: 'Confirm Password',
  },
  createPassword: {
    id: 'createPassword',
    defaultMessage: 'Create password',
  },
  email: {
    id: 'email',
    defaultMessage: 'E-mail',
  },
  inputIsNotValidEmail: {
    id: 'inputIsNotValidEmail',
    defaultMessage: 'The input is not valid E-mail!',
  },
  passwordsInconsistent: {
    id: 'passwordsInconsistent',
    defaultMessage: 'The two passwords you entered are inconsistent!',
  },
  pleaseConfirmYourPassword: {
    id: 'pleaseConfirmYourPassword',
    defaultMessage: 'Please confirm your password!',
  },
  pleaseCreateAPassword: {
    id: 'pleaseCreateAPassword',
    defaultMessage: 'Please create a password!',
  },
  pleaseInputYourEmail: {
    id: 'pleaseInputYourEmail',
    defaultMessage: 'Please input your E-mail!',
  },
  pleaseTypeInAnAnswer: {
    id: 'pleaseTypeInAnAnswer',
    defaultMessage: 'Please type in an answer!',
  },
  answer: {
    id: 'answer',
    defaultMessage: 'Answer',
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
