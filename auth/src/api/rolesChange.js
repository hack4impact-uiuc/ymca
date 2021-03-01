const router = require("express").Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const { sendResponse } = require("./../utils/sendResponse");
const { getRolesForUser } = require("./../utils/getConfigFile");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");
const handleAsyncErrors = require("../utils/errorHandler");
const { verifyUser } = require("./../utils/userVerification");
const { googleAuth } = require("./../utils/getConfigFile");

router.post(
  "/roleschange",
  [
    check("userEmail").isEmail(),
    check("newRole").isString().isLength({ min: 1 }),
  ],
  handleAsyncErrors(async function (req, res) {
    // Check that it has the email and new role of the user being promoted
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid request", {
        errors: errors.array({ onlyFirstError: true }),
      });
    }

    let user = null;
    let authenticated = false;
    const useGoogle = await googleAuth();
    if (!useGoogle || !req.headers.google || !JSON.parse(req.headers.google)) {
      // If it is not a google user, it verifies the token is valid, the user exists, and verify the password
      user = await verifyUser(req.headers.token);
      if (user.errorMessage != null) {
        return sendResponse(res, 400, user.errorMessage);
      }
      if (
        req.body.password &&
        (await bcrypt.compare(req.body.password, user.password))
      ) {
        authenticated = true;
      } else {
        return sendResponse(res, 400, "Invalid password");
      }
    } else {
      // If it is a google user, it makes a request to the google API using the token and fetches the email. If the user is in the database it finds it or returns an error message.
      const tokenInfoRes = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.headers.token}`
      );
      const payload = await tokenInfoRes.json();
      user = await User.findOne({ email: payload.email, googleAuth: true });
      if (!user) {
        sendResponse(res, 400, "User does not exist in the database");
        return;
      }
      authenticated = true;
    }

    // Find the user that is being promoted and he or she is in the database
    let userToBePromoted = await User.find({ email: req.body.userEmail });
    if (userToBePromoted.length === 0) {
      return sendResponse(res, 400, "User with that email doesn't exist");
    }

    // If the current user has the correct permission level, promote the user or send a corresponding success or error message
    const roles = await getRolesForUser(user.role);
    roles.push(user.role);

    userToBePromoted = userToBePromoted[0];
    if (roles.indexOf(req.body.newRole) >= 0 && authenticated) {
      userToBePromoted.role = req.body.newRole;
      await userToBePromoted.save();
      return sendResponse(
        res,
        200,
        "Sucessfully set new permission level for " +
          String(userToBePromoted.email) +
          " to " +
          String(userToBePromoted.role)
      );
    } else {
      return sendResponse(res, 400, "Incorrect Permission Levels");
    }
  })
);

module.exports = router;
