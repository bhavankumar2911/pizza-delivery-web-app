const { signup, verifyEmail } = require("../controller/userAuth");

const router = require("express").Router();

router.post("/signup", signup);

router.post("/verify-email/:id", verifyEmail);

module.exports = router;
