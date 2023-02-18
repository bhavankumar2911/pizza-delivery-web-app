const srs = require("secure-random-string");
const validator = require("validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../services/auth");
const VerificationCode = require("../models/VerificationCode");

module.exports = {
  signup: async (req, res) => {
    // validation
    const { body } = req;
    const { name, email, phone, address, password1, password2 } = body;

    if (!(name && email && phone && address && password1 && password2))
      return res.status(400).json({ message: "Enter all fields" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Enter a valid email address" });

    if (password1 != password2)
      return res.status(400).json({ message: "Passwords didn't match" });

    // check existing user
    try {
      const user = await User.findOne({ $or: [{ email }, { phone }] });

      if (user)
        return res.status(400).json({
          message: "Email address or phone number is already registered",
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    // password hashing
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password2, salt);

    // store in db
    try {
      const result = await User.create({
        name,
        email,
        phone,
        address,
        password: hash,
        emailVerified: false,
      });

      // email verification
      const verificationCode = srs({ length: 10 });

      // save code in db
      await VerificationCode.create({
        userId: result._id,
        code: verificationCode,
      });

      // send email

      const { success } = await sendMail(
        email,
        "Email Verification",
        `Use this code ${verificationCode} to verify your email`,
        `
          <div>
            <p>Use this code</p>
            <h3>${verificationCode}</h3>
            <p>to verify your email.</p>
          </div>
        `
      );

      if (!success)
        return res.status(500).json({
          message: "Cannot send verification code. Internal Server Error",
        });

      return res.status(200).json({
        message: "Verify your email. Check your email inbox",
        user: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  verifyEmail: async (req, res) => {
    const { id } = req.params;
    const { code } = req.body;

    if (!code)
      return res.status(400).json({ message: "Enter a verification code" });

    try {
      const result = await VerificationCode.findOne({ userId: id });

      if (!result) return res.status(404).json({ message: "User not found" });

      if (result.code !== code)
        return res.status(400).json({ message: "Invalid verification code" });

      // verify user
      await User.updateOne({ _id: id }, { emailVerified: true });

      await VerificationCode.deleteOne({ userId: id });

      return res.status(200).json({ message: "Email verified" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
