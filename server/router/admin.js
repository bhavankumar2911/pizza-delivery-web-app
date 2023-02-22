const { login } = require("../controller/adminAuth");
const {
  getAll,
  updateStock,
  updateThreshold,
} = require("../controller/inventory");

const router = require("express").Router();

router.post("/login", login);

// inventory management
router.get("/inventory", getAll);

router.patch("/stock/:id", updateStock);

router.patch("/threshold/:id", updateThreshold);

module.exports = router;
