const mongoose = require('mongoose');

// Tracks the verification level of translations
const VerifiedTranslation = new mongoose.Schema({
  resourceID: { type: mongoose.Types.ObjectId, required: false },
  categoryID: { type: mongoose.Types.ObjectId, required: false },
  subcategoryID: { type: mongoose.Types.ObjectId, required: false },
  testimonialID: { type: mongoose.Types.ObjectId, required: false },
  translationID: { type: String, required: true },
  verified: { type: Boolean, required: true },
  numReports: { type: Number, required: true },
  language: { type: String, required: true },
});

module.exports = mongoose.model('VerifiedTranslation', VerifiedTranslation);

// resource id
// collection of objects:
// { documentID (resource id, category id, subcategory id, testimonial id), type,
// translation id, verified, num reports }

// backend for form needs to return all text for a resource, along with its' translations, along with its' verified or not
// { translation id, verified, num reports, english text, translated text }

// endpoint for table returns name, priority, status, type,
// resource/category/subcategory/testimonial-ID
// TODO: jackie delete these comments when done with backend
