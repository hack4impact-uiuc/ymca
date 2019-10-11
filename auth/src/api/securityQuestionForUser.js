const router = require("express").Router();
const { check, validationResult } = require("express-validator/check");
const { sendResponse } = require("../utils/sendResponse");
const User = require("../models/User");
const { isSecurityQuestionEnabled } = require("../utils/getConfigFile");

router.post(
  "/securityQuestionForUser",
  check("email").isEmail(),
  async function(req, res) {
    // Check that the user's email is in the body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid request", {
        errors: errors.array({ onlyFirstError: true })
      });
    }

    if (!(await isSecurityQuestionEnabled())) {
      return sendResponse(res, 400, "Security questions are not enabled");
    }

    // Finds the user in thhe database, and either returns that the user is not registered or the assocaited security question with their account
    const user = await User.find({ email: req.body.email });
    if (!user || !user.length) {
      return sendResponse(res, 400, "User is not registered!");
    } else {
      return res.status(200).send({
        question: user[0].question
      });
    }
  }
);

module.exports = router;
