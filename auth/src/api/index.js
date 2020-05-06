var router = require("express").Router();

router.use("/auth/", require("./login"));
router.use("/auth/", require("./register"));
router.use("/auth/", require("./getSecurityQuestions"));
router.use("/auth/", require("./passwordReset"));
router.use("/auth/", require("./forgotPassword"));
router.use("/auth/", require("./changePassword"));
router.use("/auth/", require("./google"));
router.use("/auth/", require("./updateSecurityQuestion"));
router.use("/auth/", require("./verifyEmail"));
router.use("/auth/", require("./roles"));
router.use("/auth/", require("./rolesChange"));
router.use("/auth/", require("./verify"));
router.use("/auth/", require("./resendVerificationEmail"));
router.use("/auth/", require("./securityQuestionForUser"));
router.use("/auth/", require("./getUser"));
router.use("/auth/", require("./userResources"));

module.exports = router;
