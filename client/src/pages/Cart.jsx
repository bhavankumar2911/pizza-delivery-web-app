import React from "react";
import CartItem from "../components/CartItem";
import Container from "../components/Container";
import { useAppContext } from "../providers/App";
import { Button, List, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart } = useAppContext();
  const navigate = useNavigate();
  const { mutate } = useMutation(
    (data) => axios.post("/order/payment-initiate", data),
    {
      onError: (err) => console.log(err),
      onSuccess: (response) => {
        const { order } = response.data;
        console.log(response);
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY,
          amount: order.amount,
          currency: order.currency,
          order_id: order.id,
          name: "Pizza Delivery",
          handler: async (rp) => {
            console.log(rp);
            try {
              const verificationResponse = await axios.post(
                "/order/payment-verify",
                { ...rp, cart, amount: getAmountPayable() }
              );

              navigate(`/dashboard/${localStorage.getItem("user_id")}`);
            } catch (error) {
              console.log(error);
            }
          },
          theme: {
            color: "#E07C24",
          },
          prefill: {
            email: localStorage.getItem("user_email"),
            contact: localStorage.getItem("user_phone"),
          },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      },
    }
  );

  function getAmountPayable() {
    return cart.reduce((total, item) => {
      return (total += item.price * item.quantity);
    }, 0);
  }

  const handleCheckout = () => {
    mutate({ amount: getAmountPayable() });
  };

  return (
    <main>
      <Container>
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <br />
          <br />
          <br />
          <center>
            <Typography.Title level={3}>Your Cart</Typography.Title>
          </center>

          <List
            itemLayout="horizontal"
            dataSource={cart}
            renderItem={(item) => <CartItem item={item} />}
          />

          <center>
            <br />
            <Typography.Title level={4}>
              Amount payable: Rs. {getAmountPayable()}
            </Typography.Title>
          </center>

          <Button
            style={{ marginTop: "2rem" }}
            icon={<ShoppingCartOutlined />}
            type="primary"
            onClick={handleCheckout}
            block
          >
            Checkout
          </Button>
        </div>
      </Container>
    </main>
  );
};

export default Cart;
