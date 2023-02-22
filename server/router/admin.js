const { login } = require("../controller/adminAuth");
const { getAll } = require("../controller/inventory");

const router = require("express").Router();

router.post("/login", login);

// inventory management
router.get("/inventory", getAll);

module.exports = router;
