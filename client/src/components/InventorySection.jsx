import React from "react";
import { Space, Typography, Card } from "antd";

const InventorySection = ({ title, data }) => {
  return (
    <section>
      <Typography.Title level={4}>{title}</Typography.Title>
      <br />
      <Space
        size="large"
        style={{
          flexWrap: "wrap",
          display: "flex",
          //   justifyContent: "center",
        }}
      >
        {data.map((item, index) => (
          <Card
            // style={{ width: "50px" }}
            key={index}
            title={item.item}
            bordered={false}
          >
            <p>In Stock: {item.quantity}</p>
          </Card>
        ))}
      </Space>
      <br />
    </section>
  );
};

export default InventorySection;
