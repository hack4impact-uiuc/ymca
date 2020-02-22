const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const User = require('../../../auth/src/models/User')
const Resource = require('../models/resource');
const { verifyUser } = require("../../../utils/userVerification");
const { sendResponse } = require("../../../utils/sendResponse");

// Add resource to saved resources of user
router.get(
    '/',
    errorWrap(async (req, res) => {
        return sendResponse(res, 200, "HELLLOOEFJIWEOFJ:OFWFOWJFI:OWJFE:IOWFEIJO");
    }),
);

router.put(
    '/',
    errorWrap(async (req, res) => {
        const { resourceId } = req.params;
        if (!req.headers.token) {
            return sendResponse(res, 400, "Invalid Token");
        }
        // Verifies the token and checks that the user is registered
        const user = await verifyUser(req.headers.token);
        if (user.errorMessage != null) {
            return sendResponse(res, 400, user.errorMessage);
        }
        user.savedResources.push(resourceId);
        sendResponse(res, 200, "Successful Addition of Resource!");
    }),
);
  
module.exports = router;
  