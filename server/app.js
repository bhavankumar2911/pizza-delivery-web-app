const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const userRouter = require("./router/user");
const adminRouter = require("./router/admin");
const orderRouter = require("./router/order");
require("dotenv").config();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// db connection
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1/pizza_delivery")
  .then(() => console.log("Connected to db.."))
  .catch((err) => console.log(err, "Not connected to db..!"));

// api
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/order", orderRouter);

app.listen(9000, () => console.log("Server running on port " + 9000));
