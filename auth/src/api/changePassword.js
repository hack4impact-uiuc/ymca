const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
const { sendResponse } = require("../utils/sendResponse");
const { sendPasswordChangeEmail } = require("../utils/sendMail");
const handleAsyncErrors = require("../utils/errorHandler");
const { signAuthJWT } = require("../utils/jwtHelpers");
const { verifyUser } = require("./../utils/userVerification");
const { googleAuth } = require("../utils/getConfigFile");

router.post(
  "/changePassword",
  [
    check("currentPassword").isString().isLength({ min: 1 }),
    check("newPassword").isString().isLength({ min: 1 }),
  ],
  handleAsyncErrors(async function (req, res) {
    // Checks that the token is in the header and the currentPassword and newPassword are in the body of the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid request", {
        errors: errors.array({ onlyFirstError: true }),
      });
    }
    if (!req.headers.token) {
      return sendResponse(res, 400, "Invalid Token");
    }

    // Verifies the token and checks that the user is registered
    const user = await verifyUser(req.headers.token);
    if (user.errorMessage) {
      return sendResponse(res, 400, user.errorMessage);
    }

    // Verifies that the current password is correct or sends teh appropriate error message.
    if (await bcrypt.compare(req.body.currentPassword, user.password)) {
      // Updates the password in the database, and sends an email to confirm the password change if gmail is enabled
      user.password = await bcrypt.hash(req.body.newPassword, 10);
      await user.save();
      const new_token = await signAuthJWT(user._id, user.password);
      const googleEnabled = await googleAuth();
      if (googleEnabled) {
        try {
          await sendPasswordChangeEmail(user.email);
        } catch (e) {
          console.log(e);
          return sendResponse(
            res,
            500,
            "Confirm email could not be sent despite Gmail being enabled. This is likely due to incorrect Gmail keys set as environment variables. Password still reset."
          );
        }
        // Sends a success message along with the new token.
        sendResponse(res, 200, "Successful change of password!", {
          token: new_token,
        });
      }
    } else {
      sendResponse(res, 400, "Current password is incorrect");
    }
  })
);

module.exports = router;
