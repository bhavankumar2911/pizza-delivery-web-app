const { isEmail } = require("validator");
const { attachLoginToken } = require("../services/auth");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and Password is required" });

    if (!isEmail(email))
      return res.status(400).json({ message: "Enter a valid email address" });

    const { ADMIN_LOGIN_EMAIL, ADMIN_LOGIN_PASSWORD } = process.env;

    if (email !== ADMIN_LOGIN_EMAIL || password !== ADMIN_LOGIN_PASSWORD)
      return res.status(400).json({ message: "Invalid credentials" });

    // sign token
    attachLoginToken(
      res,
      {
        email,
      },
      "admin_auth_token"
    );

    // ack success
    return res.status(200).json({
      message: "Login successful",
    });
  },
};
