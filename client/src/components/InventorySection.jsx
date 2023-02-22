import React from "react";
import { Space, Typography } from "antd";
import InventoryCard from "./InventoryCard";

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
        {data.map((item, index) => {
          return <InventoryCard data={item} key={index} />;
        })}
      </Space>
      <br />
    </section>
  );
};

export default InventorySection;
