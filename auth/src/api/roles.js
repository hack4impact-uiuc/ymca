const router = require("express").Router();
const User = require("../models/User");
const { sendResponse } = require("./../utils/sendResponse");
const { getRolesForUser, getAllRoles } = require("./../utils/getConfigFile");
const fetch = require("node-fetch");
const handleAsyncErrors = require("../utils/errorHandler");
const { verifyUser } = require("./../utils/userVerification");
const { googleAuth } = require("./../utils/getConfigFile");

const getUser = async (req, res) => {
  if (!req.headers.token) {
    return sendResponse(res, 400, "Invalid Token");
  }

  let user = null;
  const useGoogle = await googleAuth();
  if (!useGoogle || !req.headers.google || !JSON.parse(req.headers.google)) {
    // If it is not a google user, it verifies the token is valid and the user exists.
    user = await verifyUser(req.headers.token);
    if (user.errorMessage != null) {
      return sendResponse(res, 400, user.errorMessage);
    }
  } else {
    // If it is a google user, it makes a request to the google API using the token and fetches the email
    const tokenInfoRes = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.headers.token}`
    );
    const payload = await tokenInfoRes.json();
    // If the user is in the database it finds it or returns an error message.
    user = await User.findOne({ email: payload.email, googleAuth: true });
    if (!user) {
      sendResponse(res, 400, "User does not exist in the database");
      return;
    }
  }

  return user;
};

router.get(
  "/roles",
  handleAsyncErrors(async function(req, res) {
    const user = await getUser(req, res);
    // Reads the config file and finds all the users that this user and promote or demote
    const roles = await getRolesForUser(user.role);

    let users = [];
    await Promise.all(
      roles.map(async role => {
        let usersWithRoles = await User.find({ role });
        for (let i in usersWithRoles) {
          let newUser = {
            email: usersWithRoles[i].email,
            role: usersWithRoles[i].role
          };
          users = users.concat(newUser);
        }
      })
    );
    return res.status(200).send({
      status: 200,
      message: "Users succesfully returned",
      user_emails: users
    });
  })
);

/*
Returns all the users of the same role or lower.
*/
router.get(
  "/roles/selfset",
  handleAsyncErrors(async (req, res) => {
    const user = await getUser(req, res);
    // Reads the config file and finds all the users that this user and promote or demote
    const roles = await getRolesForUser(user.role);
    const allRoles = roles.concat(user.role);

    let users = [];
    await Promise.all(
      allRoles.map(async role => {
        let usersWithRoles = await User.find({ role });
        for (let i in usersWithRoles) {
          let newUser = {
            email: usersWithRoles[i].email,
            role: usersWithRoles[i].role
          };
          users = users.concat(newUser);
        }
      })
    );
    return res.status(200).send({
      status: 200,
      message: "Users succesfully returned",
      user_emails: users
    });
  })
);

router.get(
  "/roles/all",
  handleAsyncErrors(async function(req, res) {
    // Reads the config file and returns all roles in order of priority (first = highest)
    const roles = await getAllRoles();
    return res.status(200).send({
      status: 200,
      message: "Roles succesfully returned",
      roles: roles
    });
  })
);

module.exports = router;
