const Razorpay = require("razorpay");
const crypto = require("crypto");
const Inventory = require("../models/Inventory");
const Order = require("../models/Order");

module.exports = {
  initiatePayment: async (req, res) => {
    const { amount } = req.body;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    try {
      razorpay.orders.create(options, (error, order) => {
        if (error) {
          return res.status(500).json({
            message: "Cannot make payment. Something went wrong",
          });
        }

        return res.status(200).json({ order });
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot make payment. Something went wrong" });
    }
  },
  verifyPayment: async (req, res) => {
    const { id, email, phone, address } = req.user;

    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        cart,
        amount,
      } = req.body;

      const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

      if (razorpay_signature === expectedSign) {
        let order = {
          items: [],
        };

        for (let i = 0; i < cart.length; i += 1) {
          const cartItem = cart[i];
          let item = {
            description: {},
          };
          item.pizza = cartItem.name;
          item.quantity = cartItem.quantity;

          const base = await Inventory.findById(cartItem.base);
          const sauce = await Inventory.findById(cartItem.sauce);
          const cheese = await Inventory.findById(cartItem.cheese);
          const veggies = await Inventory.findById("63f391e3035ed7e9f8445237");

          item.description.base = base.item;
          item.description.sauce = sauce.item;
          item.description.cheese = cheese.item;
          item.description.wantVeggies = cartItem.wantVeggies;

          await Inventory.updateOne(
            { _id: cartItem.base },
            { quantity: base.quantity - cartItem.quantity }
          );
          await Inventory.updateOne(
            { _id: cartItem.sauce },
            { quantity: sauce.quantity - cartItem.quantity }
          );
          await Inventory.updateOne(
            { _id: cartItem.cheese },
            { quantity: cheese.quantity - cartItem.quantity }
          );

          if (cartItem.wantVeggies)
            await Inventory.updateOne(
              { _id: "63f391e3035ed7e9f8445237" },
              { quantity: veggies.quantity - cartItem.quantity }
            );

          console.log(item);

          order.items.push(item);
        }

        console.log("order items ---> ", order.items);

        // storing details
        await Order.create({
          ...order,
          userId: id,
          email,
          phone,
          address,
          amount,
          status: "received",
        });

        return res.status(200).json({ message: "Order placed" });
      } else return res.status(400).json({ message: "Invalid credentials" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot make payment. Something went wrong" });
    }
  },
  getUserOrders: async (req, res) => {
    const { userId } = req.params;

    try {
      const orders = await Order.find({ userId });

      return res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();

      return res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  changeOrderStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const order = await Order.findByIdAndUpdate(
        id,
        { status },
        { returnDocument: "after" }
      );

      return res.status(200).json({ message: "Updated", order });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
