const mongoose = require('mongoose');

const HomePage = new mongoose.Schema({
  backgroundPicture: { type: String },
  partners: { type: [[String]] },
});

module.exports = mongoose.model('HomePage', HomePage);
