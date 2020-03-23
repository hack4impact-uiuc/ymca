const router = require("express").Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const { sendResponse } = require("./../utils/sendResponse");
const { signAuthJWT } = require("../utils/jwtHelpers");
const handleAsyncErrors = require("../utils/errorHandler");

router.post(
  "/login",
  [
    check("email").isEmail(),
    check("password")
      .isString()
      .isLength({ min: 1 })
  ],
  handleAsyncErrors(async function(req, res) {
    // Checks that the request has the required fields (email, password)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid Request", {
        errors: errors.array({ onlyFirstError: true })
      });
    }

    // Find a user with the associated email and check that he/she isn't a google user
    var user = await User.findOne({ email: req.body.email, googleAuth: null });
    if (!user) {
      return sendResponse(res, 400, "Invalid Credentials. Please try again!");
    }

    // Compares the encrypted passwords and either returns the appropriate error message or a a success status along with the user's token, id, and permission level
    if (await bcrypt.compare(req.body.password, user.password)) {
      const jwt_token = await signAuthJWT(user._id, user.password);
      return res.status(200).send({
        status: 200,
        message: "Successful login!",
        token: jwt_token,
        uid: user._id,
        permission: user.role
      });
    } else {
      return sendResponse(res, 400, "Password incorrect. Please try again.");
    }
  })
);

module.exports = router;
