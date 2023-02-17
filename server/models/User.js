const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  password: String,
  emailVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
