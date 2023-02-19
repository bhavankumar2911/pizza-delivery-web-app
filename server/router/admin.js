const { login } = require("../controller/adminAuth");

const router = require("express").Router();

router.post("/login", login);

module.exports = router;
