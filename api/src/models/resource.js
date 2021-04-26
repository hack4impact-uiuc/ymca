const mongoose = require('mongoose');

const PhoneNumber = new mongoose.Schema({
  phoneType: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const Contact = new mongoose.Schema({
  role: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  note: { type: String, required: false },
});

const FinancialAid = new mongoose.Schema({
  education: { type: String, required: false },
  immigrationStatus: { type: String, required: false },
  deadline: { type: String, required: false },
  amount: { type: String, required: false },
});

const InternalNote = new mongoose.Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
});

const HoursSchema = new mongoose.Schema({
  hoursOfOperation: [{ day: String, period: [String] }],
});

const Resource = new mongoose.Schema({
  category: { type: [String], required: true },
  subcategory: { type: [String], required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String, required: false },
  email: { type: String, required: false },
  phoneNumbers: { type: [PhoneNumber], required: false },
  contacts: { type: [Contact], required: false },
  address: { type: String, required: false },
  addressLine2: { type: String, required: false },
  aptUnitSuite: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zip: { type: String, required: false },
  hoursOfOperation: { type: HoursSchema, required: false },
  eligibilityRequirements: { type: String, required: false },
  financialAidDetails: { type: FinancialAid, required: false },
  cost: { type: String, required: false },
  availableLanguages: { type: [String], default: ['English'], required: false },
  lastUpdated: { type: Date, default: Date.now, required: false },
  recommendation: {
    type: Number,
    required: false,
  },
  requiredDocuments: { type: [String], required: false },
  internalNotes: { type: [InternalNote], required: false },
  image: { type: String, required: false },
  geoLocation: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      default: undefined,
    },
  },
});
Resource.index({ geoLocation: '2dsphere' });

module.exports = mongoose.model('Resource', Resource);
