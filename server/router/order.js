const { initiatePayment, verifyPayment } = require("../controller/order");
const userAuth = require("../middlewares/userAuth");

const router = require("express").Router();

router.post("/payment-initiate", userAuth, initiatePayment);
router.post("/payment-verify", userAuth, verifyPayment);

module.exports = router;
