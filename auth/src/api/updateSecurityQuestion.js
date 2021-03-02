const router = require("express").Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator/check");
const { sendResponse } = require("../utils/sendResponse");
const bcrypt = require("bcryptjs");
const { getSecurityQuestions } = require("../utils/getConfigFile");
const handleAsyncErrors = require("../utils/errorHandler");
const { verifyUser } = require("../utils/userVerification");

router.post(
  "/updateSecurityQuestion",
  [
    check("questionIdx").isNumeric(),
    check("answer")
      .isString()
      .isLength({ min: 1 }),
    check("password")
      .isString()
      .isLength({ min: 1 })
  ],
  handleAsyncErrors(async function(req, res) {
    // Checks that the token is in the header and the questionIdx, answer, and passwword are in the body of the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid request", {
        errors: errors.array({ onlyFirstError: true })
      });
    }
    if (!req.headers.token) {
      return sendResponse(res, 400, "Invalid Token");
    }

    // Verifies the token and checks that the user is registered and is not a google user
    let user = await verifyUser(req.headers.token);
    if (user.errorMessage != null) {
      return sendResponse(res, 400, user.errorMessage);
    }
    if (user.googleAuth == true) {
      return sendResponse(
        res,
        400,
        "Google users do not have security questions"
      );
    }

    //  Verifies that the current password is correct or sends the appropriate error message.
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return sendResponse(res, 400, "Incorrect Password");
    }

    // Finds the corresponding question using the questionIndex
    const securityQuestionsResponse = await getSecurityQuestions();
    if (!securityQuestionsResponse.success) {
      return sendResponse(res, 500, "Security question unable to set");
    }
    const question =
      securityQuestionsResponse.securityQuestions[req.body.questionIdx];
    if (!question) {
      return sendResponse(
        res,
        400,
        "User entered wrong security question or no answer"
      );
    }

    // Updates the user model with the security question and answer, and returns a corresponding success or failure message
    try {
      await User.update(
        { _id: user._id },
        {
          question: question,
          answer: req.body.answer.toLowerCase().replace(/\s/g, "")
        }
      );
      return sendResponse(res, 200, "Succesfully added the security question");
    } catch (e) {
      return sendResponse(
        res,
        400,
        "The user model was not succesfully updated"
      );
    }
  })
);

module.exports = router;
