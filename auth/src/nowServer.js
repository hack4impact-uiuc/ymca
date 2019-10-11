const app = require("./App");
const mongoose = require("mongoose");
const { getProdURI } = require("./utils/getConfigFile");

async function setupDB() {
  const prodURI = await getProdURI();
  mongoose.connect(prodURI, { useNewUrlParser: true });
}
setupDB();

module.exports.default = app;
