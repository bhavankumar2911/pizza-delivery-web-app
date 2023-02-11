import { Col, Row, List, Select, Typography, Space, Input, Button } from "antd";
import React from "react";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";

const CartItem = ({ item }) => {
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
            <Button icon={<PlusOutlined />} />
            <Input style={{ width: "50px" }} />
            <Button icon={<MinusOutlined />} />
          </Input.Group>
          <Button icon={<DeleteOutlined />} type="primary" danger />
        </Space>
      </div>
    </List.Item>
  );
};

export default CartItem;
