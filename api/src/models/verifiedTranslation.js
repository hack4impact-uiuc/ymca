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
