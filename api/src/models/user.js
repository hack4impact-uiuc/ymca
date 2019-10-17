const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: { type: String, required: true },
  role: { type: String, required: true },
  ymcaId: { type: Number, required: false },
});

module.exports = mongoose.model('User', User);
