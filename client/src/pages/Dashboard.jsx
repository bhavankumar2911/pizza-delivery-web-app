import React from "react";
import PizzaCard from "../components/PizzaCard";
import data from "../pizza.json";
import { Space, Typography } from "antd";
import Container from "../components/Container";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <main>
      <Header />

      <Container>
        <center>
          <br />
          <br />
          <br />
          <Typography.Title level={3}>Dashboard</Typography.Title>
          <br />
          <br />
        </center>
        <ul style={{ padding: "0" }}>
          <Space
            size="large"
            style={{
              flexWrap: "wrap",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {data.map((pizza, index) => (
              <PizzaCard pizza={pizza} key={index} />
            ))}
          </Space>
        </ul>
        <br />
        <br />
      </Container>
    </main>
  );
};

export default Dashboard;
