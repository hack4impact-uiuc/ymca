const router = require("express").Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator/check");
const { sendResponse } = require("./../utils/sendResponse");
const {
  isGmailEnabledForForgotPassword,
  isSecurityQuestionEnabled
} = require("../utils/getConfigFile");
const { sendMail } = require("../utils/sendMail");
const { generatePIN } = require("../utils/pinHelpers");
const handleAsyncErrors = require("../utils/errorHandler");

router.post(
  "/forgotPassword",
  [
    check("email").isEmail(),
    check("answer")
      .isString()
      .isLength({ min: 1 })
      .optional()
  ],
  handleAsyncErrors(async function(req, res) {
    // Checks that the email and answer (optional) are in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid request", {
        errors: errors.array({ onlyFirstError: true })
      });
    }
    const securityQuestionEnabled = await isSecurityQuestionEnabled();
    if (securityQuestionEnabled && !req.body.answer) {
      return sendResponse(
        res,
        400,
        "Invalid request, security question answer not found in body"
      );
    }

    // Checks that gmail is enabled for forgot password
    const usingGmail = await isGmailEnabledForForgotPassword();
    if (!usingGmail) {
      return sendResponse(
        res,
        500,
        "Gmail not enabled. Do not use this endpoint."
      );
    }

    // Find the corresponding user in the database using the email, or return the corresponding error
    let user;
    try {
      user = await User.findOne({ email: req.body.email });
    } catch (e) {
      return sendResponse(res, 500, e.message);
    }
    if (!user) {
      return sendResponse(res, 400, "User does not exist in the DB.");
    }

    // Checks that the answers to the security questions match or that the security question is not enabled
    if (
      (req.body.answer &&
        user.answer === req.body.answer.toLowerCase().replace(/\s/g, "")) ||
      !securityQuestionEnabled
    ) {
      // Sends an email with the pin to verify the user's email before letting them update their password.
      generatePIN(user);
      await user.save();
      const body = {
        from: "hack4impact.infra@gmail.com",
        to: user.email,
        subject: "Forgot Password",
        text: "Enter the following pin on the reset page: " + user.pin
      };
      await sendMail(body);
      sendResponse(res, 200, "Sent password reset PIN to user if they exist");
    } else {
      console.log(user.answer);
      console.log(req.body.answer);
      sendResponse(res, 400, "Answer to security question doesn't match");
    }
  })
);

module.exports = router;
