const router = require("express").Router();
const { sendResponse } = require("./../utils/sendResponse");
const { googleAuth } = require("../utils/getConfigFile");
const { generatePIN } = require("../utils/pinHelpers");
const { sendMail } = require("../utils/sendMail");
const handleAsyncErrors = require("../utils/errorHandler");

const { verifyUser } = require("./../utils/userVerification");
router.post(
  "/resendVerificationEmail",
  handleAsyncErrors(async function(req, res) {
    // If gmail is not enabled, it returns an error message
    const usingGmail = await googleAuth();
    if (!usingGmail) {
      return sendResponse(res, 500, "Endpoint invalid. Gmail is not enabled.");
    }

    // Verify that the token is valid and the user exists in the database. Will return you an error message if the user is already verified
    const user = await verifyUser(req.headers.token);
    if (user.errorMessage != null) {
      return sendResponse(res, 400, user.errorMessage);
    }
    if (user.verified) {
      sendResponse(res, 400, "User is already verified");
    }

    // Will generate a pin and send it in an email to the user. Sends a success or error message based on if the email is succesfully sent.
    generatePIN(user);
    const body = {
      from: "hack4impact.infra@gmail.com",
      to: user.email,
      subject: "New User Verification",
      text:
        "Thanks for signing up! Please enter the following PIN on the new user confirmation page: " +
        user.pin
    };
    try {
      await sendMail(body);
      await user.save();
      return sendResponse(res, 200, "Verification email successfully resent");
    } catch (e) {
      console.log(e);
      return sendResponse(
        res,
        500,
        "Email could not be sent despite Gmail being enabled. This is likely due to incorrect gmail credentials or an invalid email. Verification email not resent."
      );
    }
  })
);

module.exports = router;
