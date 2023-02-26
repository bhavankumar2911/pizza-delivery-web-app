const { signup, verifyEmail, login } = require("../controller/userAuth");

const router = require("express").Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/verify-email/:id", verifyEmail);

module.exports = router;
