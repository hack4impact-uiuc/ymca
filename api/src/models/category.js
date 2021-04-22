const mongoose = require('mongoose');

const Subcategory = new mongoose.Schema({
  name: { type: String, required: true },
});

const Category = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: { type: [Subcategory], required: true },
});

module.exports = mongoose.model('Category', Category);
