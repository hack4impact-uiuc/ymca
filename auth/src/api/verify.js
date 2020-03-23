const router = require("express").Router();
const User = require("../models/User");
const { sendResponse } = require("./../utils/sendResponse");
const { signAuthJWT, shouldUpdateJWT } = require("./../utils/jwtHelpers");
const { googleAuth } = require("./../utils/getConfigFile");
const fetch = require("node-fetch");
const { verifyUser } = require("./../utils/userVerification");
const handleAsyncErrors = require("../utils/errorHandler");

router.post(
  "/verify",
  handleAsyncErrors(async function(req, res) {
    // Check that there is a token in the header of the request
    if (!req.headers.token) {
      return sendResponse(res, 400, "Invalid Token");
    }

    const useGoogle = await googleAuth();
    //  If the user is google authenticated, make a request the google API to get the users email.
    if (useGoogle && req.headers.google && JSON.parse(req.headers.google)) {
      const tokenInfoRes = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.headers.token}`
      );
      const payload = await tokenInfoRes.json();

      // Using the user's email find them in the database and return a success message with the users role and id
      const user = await User.findOne({
        email: payload.email,
        googleAuth: true
      });
      if (user) {
        return res.status(200).send({
          status: 200,
          message: "Succesfully Google Authenticated",
          role: user.role,
          authId: user._id
        });
      } else {
        // Return an error message if they aren't in the database
        return sendResponse(res, 400, "Google authenticated user not found");
      }
    }

    // If the user isn't google authentciated, it verifies their token is valid and corresponds to a user in the database
    const user = await verifyUser(req.headers.token);
    if (user.errorMessage != undefined) {
      return sendResponse(res, 400, user.errorMessage);
    }

    // Check if the token has been refreshed, and if so regenerate a JWT token and return it along with the user's role, autheid, and verification status
    if (await shouldUpdateJWT(req.headers.token, user._id, user.password)) {
      var newToken = await signAuthJWT(user._id, user.password);
      return res.status(200).send({
        status: 200,
        message: "Valid JWT token",
        role: user.role,
        authId: user._id,
        emailVerified: user.verified,
        newToken
      });
    }

    // Otherwise send a success message just return the user's role, authenticationId, and email verification status
    return res.status(200).send({
      status: 200,
      message: "Valid JWT token",
      role: user.role,
      authId: user._id,
      emailVerified: user.verified
    });
  })
);

module.exports = router;
