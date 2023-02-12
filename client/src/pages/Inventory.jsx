import { Divider, Space, Typography } from "antd";
import React from "react";
import Container from "../components/Container";
import InventorySection from "../components/InventorySection";
import inventory from "../inventory.json";

const Inventory = () => {
  return (
    <main style={{ backgroundColor: "#eee", padding: "2rem 0" }}>
      <Container>
        <Typography.Title level={2}>Inventory</Typography.Title> <br />
        <br />
        <Space style={{ display: "flex" }} direction="vertical" size="medium">
          <InventorySection title="Pizza base" data={inventory["base"]} />
          <Divider />
          <InventorySection title="Sauce" data={inventory["sauce"]} />
          <Divider />
          <InventorySection title="Cheese" data={inventory["cheese"]} />
          <Divider />
          <InventorySection title="Extras" data={inventory["extras"]} />
        </Space>
      </Container>
    </main>
  );
};

export default Inventory;
