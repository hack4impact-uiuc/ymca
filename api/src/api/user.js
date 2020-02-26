const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const User = require('../../../auth/src/models/User');
const { jwt_decode } = require('jwt-decode');

// Add resource to saved resources of user
router.get(
    '/',
    errorWrap(async (req, res) => {
        res.status(200).json({
            code: 200,
            message: `Successfully called get lol`,
            success: true,
        })
    }),
);

router.put(
    '/',
    errorWrap(async (req, res) => {
        // Verifies the token and checks that the user is registered
        const { resourceId } = req.params;
        const userId = jwt_decode(req.headers.token);
        const user = await User.findById(userId);
        user.savedResources.push(resourceId);
        user.save()
        res.status(200).json({
            code: 200,
            message: `Successfully added saved resource`,
            success: true,
            result: resourceId,
        });
    }),
);
  
module.exports = router;
  