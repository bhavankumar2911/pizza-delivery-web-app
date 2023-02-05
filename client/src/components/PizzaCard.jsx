import React from "react";
import { Button, Card } from "antd";
import { useAppContext } from "../providers/App";
const { Meta } = Card;

const PizzaCard = ({ pizza }) => {
  const { addToCart } = useAppContext();

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          alt="example"
          src={pizza.image}
          style={{ height: "200px", objectFit: "cover" }}
        />
      }
    >
      <Meta title={pizza.name} description={`Rs. ${pizza.price}`} />
      <br />
      <Button type="primary" onClick={() => addToCart(pizza)} block>
        Add To Cart
      </Button>
    </Card>
  );
};

export default PizzaCard;
