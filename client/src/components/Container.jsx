import { Col, Row } from "antd";
import React from "react";

const Container = ({ children, space }) => {
  return (
    <Row>
      <Col span={20} offset={2} style={space ? { padding: "2rem 0" } : null}>
        {children}
      </Col>
    </Row>
  );
};

export default Container;
