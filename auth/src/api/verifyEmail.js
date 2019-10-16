const router = require("express").Router();
const { sendResponse } = require("./../utils/sendResponse");
const { googleAuth } = require("../utils/getConfigFile");
const handleAsyncErrors = require("../utils/errorHandler");
const { verifyUser } = require("./../utils/userVerification");
const { check, validationResult } = require("express-validator/check");

router.post(
  "/verifyEmail",
  [
    check("pin")
      .isNumeric()
      .optional()
  ],
  handleAsyncErrors(async function(req, res) {
    // If gmail is not enabled, it returns an error message
    const googleEnabled = await googleAuth();
    if (!googleEnabled) {
      return sendResponse(
        res,
        500,
        "Gmail not enabled. Do not use this endpoint."
      );
    }

    // Checks that the request has the required fields (pin)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid request", {
        errors: errors.array({ onlyFirstError: true })
      });
    }

    //  Verify that the token is valid and the user exists in the database. Will return you an error message if the user is already verified
    const user = await verifyUser(req.headers.token);
    if (user.errorMessage != null) {
      return sendResponse(res, 400, user.errorMessage);
    }
    if (user.verified) {
      return sendResponse(res, 400, "User has already verified their email");
    }

    // Will respond with the user succesfully verified if the pin matches, or an error message if it doesn't match.
    if (req.body.pin != user.pin) {
      return sendResponse(res, 400, "PIN does not match");
    }
    user.verified = true;
    await user.save();
    return sendResponse(res, 200, "User successfully verified");
  })
);

module.exports = router;
