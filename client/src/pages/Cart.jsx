import React from "react";
import CartItem from "../components/CartItem";
import Container from "../components/Container";
import { useAppContext } from "../providers/App";
import { Button, List, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const Cart = () => {
  const { cart } = useAppContext();

  return (
    <main>
      <Container>
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

        <Button
          style={{ marginTop: "2rem" }}
          icon={<ShoppingCartOutlined />}
          type="primary"
          block
        >
          Checkout
        </Button>
      </Container>
    </main>
  );
};

export default Cart;
