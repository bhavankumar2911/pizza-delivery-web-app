const nodeMailer = require("nodemailer");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_REFRESH_TOKEN,
  GOOGLE_MAIL_ADDRESS,
} = process.env;

// creating the oauth2 client
const OAuth2Client = new google.auth.OAuth2(
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
OAuth2Client.setCredentials({ refresh_token: GOOGLE_OAUTH_REFRESH_TOKEN });

// sending the mail
const sendMail = async (email, subject, textBody, htmlBody) => {
  try {
    // creating the access token
    const accessToken = await OAuth2Client.getAccessToken();

    // transport options
    const transportOptions = {
      service: "gmail",
      auth: {
        type: "oauth2",
        user: GOOGLE_MAIL_ADDRESS,
        clientId: GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
        refreshToken: GOOGLE_OAUTH_REFRESH_TOKEN,
        accessToken,
      },
    };

    // creating nodemailer transport
    const transport = nodeMailer.createTransport(transportOptions);

    // mail options
    const mailOptions = {
      from: GOOGLE_MAIL_ADDRESS,
      to: email,
      subject,
      text: textBody,
      html: htmlBody,
    };

    // sending the mail
    const info = await transport.sendMail(mailOptions);

    if (!info) return { success: false };

    return { success: true };
  } catch (error) {
    console.log("Cannot send mail", error);
    return { success: false };
  }
};

const attachLoginToken = async (res, payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.cookie("auth_token", token, { httpOnly: true });
};

module.exports.sendMail = sendMail;
module.exports.attachLoginToken = attachLoginToken;
