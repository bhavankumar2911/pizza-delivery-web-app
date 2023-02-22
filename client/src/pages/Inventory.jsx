import { Divider, Space, Typography, Spin, Alert } from "antd";
import React from "react";
import Container from "../components/Container";
import InventorySection from "../components/InventorySection";
import inventory from "../inventory.json";
import { useQuery } from "react-query";
import axios from "axios";

const fetchInventory = () => axios.get("/admin/inventory");

const Inventory = () => {
  const { isLoading, isError, data, error } = useQuery(
    "inventory",
    fetchInventory
  );

  if (isLoading)
    return (
      <center>
        <Spin style={{ marginTop: "5rem" }} tip="Loading" />
      </center>
    );

  if (isError) {
    let errMessage;
    if (error.response) errMessage = error.response.data.message;
    else errMessage = error.message;
    return (
      <center>
        <Alert
          style={{ marginTop: "5rem", width: "50%" }}
          type="error"
          message={errMessage}
        />
      </center>
    );
  }

  return (
    <main style={{ backgroundColor: "#eee", padding: "2rem 0" }}>
      <Container>
        <Typography.Title level={2}>Inventory</Typography.Title> <br />
        <br />
        <Space style={{ display: "flex" }} direction="vertical" size="medium">
          <InventorySection
            title="Pizza Base"
            data={data.data.data.filter((item) => item.category == "base")}
          />
          <Divider />
          <InventorySection
            title="Sauce"
            data={data.data.data.filter((item) => item.category == "sauce")}
          />
          <Divider />
          <InventorySection
            title="Cheese"
            data={data.data.data.filter((item) => item.category == "cheese")}
          />
          <Divider />
          <InventorySection
            title="Extras"
            data={data.data.data.filter((item) => item.category == "extras")}
          />
        </Space>
      </Container>
    </main>
  );
};

export default Inventory;
