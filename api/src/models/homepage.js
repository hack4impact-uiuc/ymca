const mongoose = require('mongoose');

const Testimonial = new mongoose.Schema({
  person: { type: String },
  image: { type: String },
  title: { type: String },
  testimonial: { type: String },
});

const HomePage = new mongoose.Schema({
  backgroundImage: { type: String },
  testimonials: { type: [Testimonial] },
  partners: { type: [[String]] },
});

module.exports = mongoose.model('HomePage', HomePage);
