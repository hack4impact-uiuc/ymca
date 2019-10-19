const mongoose = require('mongoose');

const YMCAUser = new mongoose.Schema({
  email: { type: String, required: true },
  role: { type: String, required: true },
  companyId: { type: Number, required: false },
});

module.exports = mongoose.model('YMCAUser', YMCAUser);
