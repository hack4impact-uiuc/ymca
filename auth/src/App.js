const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const RateLimit = require("express-rate-limit");
const { sendResponse } = require("./utils/sendResponse");
const router = require("./api/index");

const app = express();
require("dotenv").config();

const limiter = new RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(limiter);

app.use("/", router);
app.use(function (err, req, res, next) {
  console.error(err);
  console.log(err.stack);
  sendResponse(
    res,
    500,
    "An uncaught exception occured on the server. Please contact the Hack4Impact Infrastructure Team"
  );
  next();
});

module.exports = app;
