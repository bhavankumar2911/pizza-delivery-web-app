const { signup } = require("../controller/userAuth");

const router = require("express").Router();

router.post("/signup", signup);

module.exports = router;
