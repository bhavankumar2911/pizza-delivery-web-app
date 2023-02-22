const { Schema, default: mongoose } = require("mongoose");

const inventorySchema = new Schema({
  category: String,
  item: String,
  quantity: Number,
  threshold: Number,
});

module.exports = mongoose.model("Inventory", inventorySchema);
