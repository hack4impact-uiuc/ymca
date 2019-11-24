const yaml = require("js-yaml");
const fs = require("fs");

const getConfigFile = async () => {
  /* we use __dirname because ncc (Zeit's now compiler) only supports
   * requiring files in this fashion. If https://github.com/zeit/ncc/issues/216 resolves,
   * we may be able to do this another way.
   */
  return await yaml.safeLoad(
    fs.readFileSync(__dirname + "/../../config.yml", "utf8")
  );
};

const getAllRoles = async () => {
  const config = await getConfigFile();
  return config["roles"];
}

const getRolesForUser = async role => {
  const config = await getConfigFile();
  if (config["roles"][role] != undefined) {
    return config["roles"][role];
  }
  return null;
};

const getSuperiorsForRole = async role => {
  const config = await getConfigFile();
  const roles = config["roles"];

  let superiors = [];

  for (let otherRole in config["roles"]) {
    let otherRoles = roles[otherRole];
    if (otherRoles != null) {
      if (otherRoles.includes(role) && otherRole !== role) {
        superiors.push(otherRole);
      }
    }
  }

  return superiors;
};

const getTestURI = async () => {
  const config = await getConfigFile();
  if (config["test_db"] != undefined) {
    return config["test_db"];
  }
  return null;
};

const getProdURI = async () => {
  if (!process.env.INFRA_MONGO_URI) {
    throw "No Mongo URI set up in the .env file. Did you go through the CLI mlab setup?";
  }
  return process.env.INFRA_MONGO_URI;
};

const googleAuth = async () => {
  const config = await getConfigFile();
  if (config["useGoogleAuth"] === undefined) {
    return true;
  }
  return config["useGoogleAuth"];
};

const isSecurityQuestionEnabled = async () => {
  const config = await getConfigFile();
  if (config["gmail"] != true && config["security_question"] != true) {
    throw "Must have at least one of Gmail and security question enabled";
  }
  if (config["security_question"] === undefined) {
    return true;
  }
  return config["security_question"];
};

const getSecurityQuestions = async () => {
  const config = await getConfigFile();
  if (config["security_questions"] === null) {
    return { success: false, error: "no questions specified in config" };
  } else if (!config["security_questions"]) {
    return { success: false, error: "no security_questions field in config" };
  } else {
    return { success: true, securityQuestions: config["security_questions"] };
  }
};

const isGmailEnabledForForgotPassword = async () => {
  const config = await getConfigFile();
  if (config["gmail"] != true && config["security_question"] != true) {
    throw "Must have at least one of Gmail and security question enabled";
  }
  if (config["gmail"] === undefined) {
    return false;
  }

  return config["gmail"];
};

const getExpiryTime = async () => {
  const config = await getConfigFile();
  if (config["expire_after_hrs"] === undefined) {
    return 1;
  }
  return config["expire_after_hrs"];
};

module.exports = {
  getConfigFile,
  getAllRoles,
  getRolesForUser,
  getSuperiorsForRole,
  getTestURI,
  googleAuth,
  isSecurityQuestionEnabled,
  isGmailEnabledForForgotPassword,
  getProdURI,
  getSecurityQuestions,
  getExpiryTime,
};
