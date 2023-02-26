import React from "react";
import PizzaCard from "../components/PizzaCard";
import data from "../pizza.json";
import { message, Space, Typography, Spin } from "antd";
import Container from "../components/Container";
import Header from "../components/Header";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UserOrdersSection from "../components/UserOrdersSection";

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: apiResponse, isLoading } = useQuery(
    "user_orders",
    () => axios.get(`/order/${id}`),
    {
      onError: (err) => {
        if (err.response && err.response.status == 403) navigate("/login");
        else if (err.response) message.error(err.response.data.message);
        else message.error("Something went wrong");
      },
    }
  );

  if (isLoading)
    return (
      <center>
        <Spin style={{ marginTop: "5rem" }} tip="Loading" />
      </center>
    );

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
        <UserOrdersSection
          sectionTitle={"Your orders"}
          orders={apiResponse.data.orders.filter(
            (order) => order.status != "delivered"
          )}
        />

        <UserOrdersSection
          sectionTitle={"Previous orders"}
          orders={apiResponse.data.orders.filter(
            (order) => order.status == "delivered"
          )}
        />
      </Container>
    </main>
  );
};

export default Dashboard;
