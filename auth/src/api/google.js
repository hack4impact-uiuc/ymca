const router = require("express").Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const fetch = require("node-fetch");
const { googleAuth, getRolesForUser } = require("./../utils/getConfigFile");
const { sendResponse } = require("./../utils/sendResponse");
const handleAsyncErrors = require("../utils/errorHandler");
require("dotenv").config();

router.post(
  "/google",
  check("tokenId").isString().isLength({ min: 1 }),
  check("role").isString().isLength({ min: 1 }),
  handleAsyncErrors(async function (req, res) {
    // Check that there is a tokenId in the body of the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid request", {
        errors: errors.array({ onlyFirstError: true }),
      });
    }

    // Check that google has been enabled
    const useGoogle = await googleAuth();
    if (!useGoogle)
      return sendResponse(res, 400, "Google authentication has not be enabled");

    // Sends the tokenId to the Google API to get  the payload, which conatins the user's email
    const tokenInfoRes = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.tokenId}`
    );
    const payload = await tokenInfoRes.json();

    //  If a user already exists with this email and is a google user it responds withh a success message.
    const user = await User.findOne({ email: payload.email, googleAuth: true });
    if (user) {
      return sendResponse(res, 200, "Successful login!");
    } else {
      const userCheck = await User.findOne({ email: payload.email });
      // Respond with an error message if the user is not a google user
      if (userCheck) {
        return sendResponse(res, 400, "User is not a Google user");
      } else {
        // If the config file allows the permissions to create a user with this role, it registers the google user.
        const requiredAuthFrom = await getRolesForUser(req.body.role);
        if (requiredAuthFrom !== null && requiredAuthFrom !== undefined) {
          return sendResponse(
            res,
            400,
            "User needs a higher permission level for that role"
          );
        }
        // Creates a new user with that email, role, no password, and with google authentication set the true, and sends a success message
        const user = new User({
          email: payload.email,
          password: null,
          googleAuth: true,
          role: req.body.role,
        });
        await user.save();
        sendResponse(res, 200, "New Google user: " + payload.email);
      }
    }
  })
);

module.exports = router;
