const router = require("express").Router();
const User = require("../models/User");
const jwt_decode = require("jwt-decode");

// Get saved resources of a user
router.get("/resources", async (req, res) => {
  const userId = jwt_decode(req.headers.token)["userId"];
  const user = await User.findById(userId);
  res.status(200).json({
    code: 200,
    message: `Succesfully got saved resources`,
    success: true,
    result: user.savedResources
  });
});

// Delete resource from the saved resources of user
router.delete("/resource", async (req, res) => {
  const { resourceId } = req.body;
  const userId = jwt_decode(req.headers.token)["userId"];
  const user = await User.findById(userId);
  const index = user.savedResources.indexOf(resourceId);
  if (index !== -1) {
    user.savedResources.splice(index, 1);
  } else {
    res.status(400).json({
      code: 400,
      message: `Could not find the resource id provided!`,
      success: false
    });
  }
  user.save();
  res.status(200).json({
    code: 200,
    message: `Successfully deleted saved resource`,
    success: true,
    result: resourceId
  });
});

// Add resource to the saved resources of the user
router.put("/resource", async (req, res) => {
  const { resourceId } = req.body;
  const userId = jwt_decode(req.headers.token).userId;
  const user = await User.findById(userId);
  user.savedResources.push(resourceId);
  user.save();
  res.status(200).json({
    code: 200,
    message: `Successfully added saved resource`,
    success: true,
    result: resourceId
  });
});

module.exports = router;
