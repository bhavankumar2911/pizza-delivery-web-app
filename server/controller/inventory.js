const Inventory = require("../models/Inventory");

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await Inventory.find();

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
