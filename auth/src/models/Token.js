const mongoose = require("mongoose");

const schema = mongoose.Schema({
  token: "string",
  issued: "date"
});

const Token = mongoose.model("Token", schema);

module.exports = Token;
