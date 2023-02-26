const {
  initiatePayment,
  verifyPayment,
  getUserOrders,
  getAllOrders,
  changeOrderStatus,
} = require("../controller/order");
const userAuth = require("../middlewares/userAuth");
const adminAuth = require("../middlewares/adminAuth");

const router = require("express").Router();

router.post("/payment-initiate", userAuth, initiatePayment);
router.post("/payment-verify", userAuth, verifyPayment);

router.get("/:userId", userAuth, getUserOrders);

router.get("/", adminAuth, getAllOrders);

router.patch("/update-status/:id", adminAuth, changeOrderStatus);

module.exports = router;
