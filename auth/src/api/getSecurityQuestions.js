const router = require("express").Router();
const handleAsyncErrors = require("../utils/errorHandler");
const { sendResponse } = require("./../utils/sendResponse");
const { getSecurityQuestions } = require("../utils/getConfigFile");
const { isSecurityQuestionEnabled } = require("../utils/getConfigFile");

router.get(
  "/getSecurityQuestions",
  handleAsyncErrors(async function(req, res) {
    if (!(await isSecurityQuestionEnabled())) {
      return sendResponse(res, 400, "Security questions are not enabled");
    }

    // Gets all the security questions from the config file
    const questionsResponse = await getSecurityQuestions();
    if (!questionsResponse.success) {
      // If the security questions can't be parsed it returns a error message
      return sendResponse(
        res,
        500,
        "No security question could be parsed from config file"
      );
    } else {
      // If they are succesfully parsed it sends a list of questions and a succesful status
      return res.status(200).send({
        questions: questionsResponse.securityQuestions
      });
    }
  })
);

module.exports = router;
