const router = require("express").Router();
const User = require("../models/User");
const { sendResponse } = require("./../utils/sendResponse");
const fetch = require("node-fetch");
const { verifyUser } = require("./../utils/userVerification");

router.get("/getUser", async function (req, res) {
  // Return an error message if the token isn't sent
  if (!req.headers.token) {
    return sendResponse(res, 400, "Invalid Token");
  }

  let user = null;
  if (!req.headers.google || !JSON.parse(req.headers.google)) {
    // If it isn't a google user, verifies the token and checks that the user exists
    user = await verifyUser(req.headers.token);
    if (user.errorMessage) {
      return sendResponse(res, 400, user.errorMessage);
    }
  } else {
    // If it is a google user, makes a request to the google API with the token to get the user's email, and then checks if a user with that email exists.
    const tokenInfoRes = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.headers.token}`
    );
    const payload = await tokenInfoRes.json();
    user = await User.findOne({ email: payload.email, googleAuth: true });
    if (!user) {
      sendResponse(res, 400, "User does not exist in the database");
      return;
    }
  }

  // Returns the email, verification status, role, and id for the user found
  return res.status(200).send({
    status: 200,
    message: "User succesfully returned",
    user_email: user.email,
    user_verified: user.verified || req.headers.google,
    user_role: user.role,
    user_id: user._id,
  });
});

module.exports = router;
