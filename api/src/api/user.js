const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const User = require('../../../auth/src/models/User')
const Resource = require('../models/resource');
const { verifyUser } = require("../../../utils/userVerification");
const { sendResponse } = require("../../../utils/sendResponse");

// Add resource to saved resources of user
router.put(
    '/:userId',
    errorWrap(async (req, res) => {
        const { userId, resourceId } = req.params;
        if (!req.headers.token) {
            return sendResponse(res, 400, "Invalid Token");
        }
        // Verifies the token and checks that the user is registered
        const user = await verifyUser(req.headers.token);
        if (user.errorMessage != null) {
            return sendResponse(res, 400, user.errorMessage);
        }
    }),
);


// // Get all resources (with query param "category")
// router.get(
//     '/',
//     errorWrap(async (req, res) => {
//       const { category } = req.query;
//       let resources;
//       if (category != null) {
//         resources = await Resource.find({ category: { $in: category } });
//       } else {
//         resources = await Resource.find();
//       }
//       res.json({
//         code: 200,
//         message: '',
//         success: true,
//         result: resources,
//       });
//     }),
//   );
  
//   // Get a resource by id
//   router.get(
//     '/:id',
//     errorWrap(async (req, res) => {
//       const { id } = req.params;
//       const resource = await Resource.findById(id);
//       if (resource === null) {
//         res.status(400).json({
//           code: 400,
//           message: `Cannot find resource ${id}`,
//           success: false,
//           result: null,
//         });
//       }
//       res.json({
//         code: 200,
//         message: `Successfully found resource ${id}`,
//         success: true,
//         result: resource,
//       });
//     }),
//   );
  
module.exports = router;
  