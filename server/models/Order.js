const { Schema, default: mongoose } = require("mongoose");

const descriptionSchema = new Schema({
  base: String,
  sauce: String,
  cheese: String,
  wantVeggies: Boolean,
});

const itemSchema = new Schema({
  pizza: String,
  description: descriptionSchema,
  quantity: Number,
});

const orderSchema = new Schema({
  userId: mongoose.Types.ObjectId,
  email: String,
  phone: String,
  address: String,
  amount: Number,
  items: [itemSchema],
  status: String,
});

module.exports = mongoose.model("Order", orderSchema);
