// @flow

export type Subcategory = {
  name: string,
  _id: string,
};

export type Category = {
  name: string,
  subcategories: Array<Subcategory>,
  _id: string,
};

type PhoneNumber = {
  phoneType: string,
  phoneNumber: string,
};

type Contact = {
  role: string,
  name: string,
  email?: string,
  phoneNumber?: string,
  note?: string,
};

type Hours = {
  hoursOfOperation: Array<{ day: string, period: Array<string> }>,
};

type FinancialAid = {
  education?: string,
  immigrationStatus?: string,
  deadline?: string,
  amount?: string,
};

type InternalNote = {
  subject: string,
  body: string,
};

export type Resource = {
  category: Array<string>,
  subcategory: Array<string>,
  name: string,
  description: string,
  website?: string,
  email?: string,
  phoneNumbers?: Array<PhoneNumber>,
  contacts?: Array<Contact>,
  address?: string,
  addressLine2?: string,
  aptUnitSuite?: string,
  city?: string,
  state?: string,
  zip?: string,
  hoursOfOperation?: Hours,
  eligibilityRequirements?: string,
  financialAidDetails?: FinancialAid,
  cost?: string,
  availableLanguages?: Array<string>,
  lastUpdated?: Date,
  recommendation?: number,
  requiredDocuments?: Array<string>,
  internalNotes?: Array<InternalNote>,
  image?: string,
  geoLocation?: { type: 'Point', coordinates: [number, number] },
  _id: string,
};
export type Testimonial = {
  _id?: string,
  person: string,
  image: string,
  title: string,
  testimonial: string,
};

export type HomePage = {
  backgroundImage: string,
  testimonials: Array<Testimonial>,
  partners: Array<Array<string>>,
};

export type TranslationMessage = {
  language: string,
  key: string,
  message: string,
};

export type Translation = {
  language: string,
  messages: { [string]: string },
};
