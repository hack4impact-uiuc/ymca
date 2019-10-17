const app = require("./App");
const mongoose = require("mongoose");
const { getProdURI } = require("./utils/getConfigFile");

async function setupDB() {
  const prodURI = await getProdURI();
  mongoose.connect(prodURI, { useNewUrlParser: true });
}
setupDB();
const server = app.listen(process.env.PORT || 8000, function() {
  console.log("Listening on http://localhost:8000");
});

module.exports.default = server;
