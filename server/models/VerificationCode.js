const { Schema, default: mongoose } = require("mongoose");

const verificationCodeSchema = new Schema({
  userId: mongoose.Types.ObjectId,
  code: String,
});

module.exports = mongoose.model("VerificationCode", verificationCodeSchema);
