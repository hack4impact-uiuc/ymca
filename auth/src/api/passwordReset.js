const router = require("express").Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const { sendResponse } = require("./../utils/sendResponse");
const { sendPasswordChangeEmail } = require("../utils/sendMail");
const { signAuthJWT } = require("../utils/jwtHelpers");
const {
  isGmailEnabledForForgotPassword,
  isSecurityQuestionEnabled
} = require("../utils/getConfigFile");
const { expirePIN } = require("../utils/pinHelpers");
const handleAsyncErrors = require("../utils/errorHandler");

router.post(
  "/passwordReset",
  [
    check("email").isEmail(),
    check("password")
      .isString()
      .isLength({ min: 1 }),
    check("pin")
      .isNumeric()
      .optional(),
    check("answer")
      .isString()
      .isLength({ min: 1 })
      .optional()
  ],
  handleAsyncErrors(async function(req, res) {
    // Checks that the email, password, and pin or answer (depending on the config file) is in the body of the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid request", {
        errors: errors.array({ onlyFirstError: true })
      });
    }

    // If gmail is enabled it is expecting a pin, but if gmail is not enabled and the security question is enabled, it is expecting an answer.
    const gmailEnabled = await isGmailEnabledForForgotPassword();
    const securityQuestionEnabled = await isSecurityQuestionEnabled();
    if (
      (gmailEnabled && !req.body.pin) ||
      (!gmailEnabled && securityQuestionEnabled && !req.body.answer)
    ) {
      sendResponse(res, 400, "Missing pin or answer to the security question");
      return;
    }

    // Finds the user that corresponds to that email, or returns an error message
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      sendResponse(res, 400, "User does not exist in the database");
      return;
    }

    // If gmail is enabled, it cehcks that the pin sent with the request is not expired and matches the one issued
    if (gmailEnabled) {
      if (user.pin && user.pin != req.body.pin) {
        sendResponse(res, 400, "PIN does not match");
        return;
      }
      if (
        !user.expiration ||
        user.expiration.getTime() < new Date().getTime()
      ) {
        sendResponse(
          res,
          400,
          "PIN is expired or expiration field doesn't exist in the DB"
        );
        return;
      }
    } else {
      // If gmail is not enabled, it checks that the answer to the security question matches the on associated with the user
      if (
        req.body.answer &&
        user.answer !== req.body.answer.toLowerCase().replace(/\s/g, "")
      ) {
        sendResponse(res, 400, "Answer to security question does not match");
        return;
      }
    }

    // Expire the pin, encrypt the passwword, and update the user model
    expirePIN(user);
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    if (gmailEnabled) {
      try {
        // Send an email to the user to alert them that the password has been updated
        await sendPasswordChangeEmail(user.email);
      } catch (e) {
        console.log(e);
        return sendResponse(
          res,
          500,
          "Confirm email could not be sent despite Gmail being enabled. This is likely due to incorrect Gmail keys set as environment variables. Password still reset."
        );
      }
    }

    // Responds to the request with a success message and a JWT token
    sendResponse(res, 200, "Password successfully reset", {
      token: await signAuthJWT(user._id, user.password)
    });
  })
);

module.exports = router;
