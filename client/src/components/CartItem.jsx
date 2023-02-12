import { Col, Row, List, Select, Typography, Space, Input, Button } from "antd";
import React from "react";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppContext } from "../providers/App";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useAppContext();

  return (
    <List.Item>
      <div>
        <Typography.Title level={5}>{item.name}</Typography.Title>
        <Typography.Text type="secondary">
          {item.cheese}, {item.base}, {item.sauce}{" "}
          {item.wantVeggies ? ", Veggies" : ""}
        </Typography.Text>
        <br />
        <Space style={{ marginTop: "10px" }}>
          <Input.Group style={{ display: "flex" }} compact>
            <Button
              icon={<MinusOutlined />}
              onClick={() => updateQuantity(item.id, "decrease")}
            />
            <Input style={{ width: "50px" }} value={item.quantity} />
            <Button
              icon={<PlusOutlined />}
              onClick={() => updateQuantity(item.id, "increase")}
            />
          </Input.Group>
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            onClick={() => removeFromCart(item.id)}
            danger
          />
        </Space>
      </div>
    </List.Item>
  );
};

export default CartItem;
