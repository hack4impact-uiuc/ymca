const mongoose = require('mongoose');

const Translation = new mongoose.Schema({
  language: { type: String, required: true },
  messages: { type: Map, of: String }
});

module.exports = mongoose.model('Translation', Translation);
