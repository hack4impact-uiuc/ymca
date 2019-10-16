// Generate a PIN for the user and inserting it into the object (but not saving it), returning the generated PIN
async function generatePIN(user) {
  if (!user) {
    throw "User is not defined";
  }
  // generate and update update pin
  user.pin = Math.floor(Math.random() * (100000000 - 100000 + 1)) + 100000;
  var date = new Date();
  // add a day to the current date for the expiration
  date.setDate(date.getDate() + 1);
  user.expiration = date;
  return user.pin;
}
async function expirePIN(user) {
  // user matches, change expiration
  var date = new Date();
  // remove a day to the current date to expire it
  // set date to 24 hours before because we don't want
  // concurrent requests happening in the same second to both go through
  // (i.e. if the user presses change password button twice)
  date.setDate(date.getDate() - 1);
  user.expiration = date;
}
module.exports = { generatePIN, expirePIN };
