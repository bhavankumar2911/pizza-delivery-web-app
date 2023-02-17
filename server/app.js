const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userAuthRouter = require("./router/userAuth");
require("dotenv").config();

const app = express();

// middlewares
app.use(express.json());
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
app.use("/user", userAuthRouter);

app.listen(9000, () => console.log("Server running on port " + 9000));
