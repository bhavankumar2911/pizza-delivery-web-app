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
  updateStock: async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
      await Inventory.updateOne({ _id: id }, { quantity });

      return res.status(200).json({ message: "Stock quantity updated" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updateThreshold: async (req, res) => {
    const { id } = req.params;
    const { threshold } = req.body;

    try {
      await Inventory.updateOne({ _id: id }, { threshold });

      return res.status(200).json({ message: "Threshold updated" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
