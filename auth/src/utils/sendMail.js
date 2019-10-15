const nodemailer = require("nodemailer");
async function sendMail(mail_body) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.INFRA_EMAIL,
      clientId: process.env.INFRA_CLIENT_ID,
      clientSecret: process.env.INFRA_CLIENT_SECRET,
      refreshToken: process.env.INFRA_REFRESH_TOKEN
    }
  });
  await transporter.sendMail(mail_body);
}

async function sendPasswordChangeEmail(email) {
  const mail_body = {
    from: "hack4impact.infra@gmail.com",
    to: email,
    subject: "Password Change Confirmation",
    text:
      "Hi, this is a confirmation to say that your password has just been changed or reset. If you did not make this change, please reply to this email."
  };
  await sendMail(mail_body);
}

module.exports = { sendMail, sendPasswordChangeEmail };
