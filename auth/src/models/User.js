const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: "string",
  password: "string",
  email: "string",
  question: "string",
  answer: "string",
  pin: "number",
  verified: "boolean",
  expiration: "date",
  userLevel: "string",
  googleAuth: "boolean",
  role: "string"
});

const User = mongoose.model("User", schema);

module.exports = User;
