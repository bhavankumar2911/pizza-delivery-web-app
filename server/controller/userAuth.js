const validator = require("validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

      return res.status(200).json({
        message: "Verify your email. Check your email inbox",
        user: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};
