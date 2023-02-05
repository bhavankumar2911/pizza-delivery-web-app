import { Typography, Badge, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Container from "./Container";
import { useAppContext } from "../providers/App";

const Header = () => {
  const { cart } = useAppContext();

  return (
    <header style={{ padding: "1.5rem 0", borderBottom: "1px solid #ccc" }}>
      <Container>
        <Space style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/dashboard">
            <Typography.Title level={2} style={{ margin: "0" }}>
              <b>
                Pizza<span style={{ color: "#E07C24" }}>Delivery</span>
              </b>
            </Typography.Title>
          </Link>

          <Link to="/cart">
            <Badge count={cart.length}>
              <span>
                <ShoppingCartOutlined
                  style={{ color: "black", fontSize: "2rem" }}
                />
              </span>
            </Badge>
          </Link>
        </Space>
      </Container>
    </header>
  );
};

export default Header;
