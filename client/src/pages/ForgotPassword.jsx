import React from "react";
import { Button, Input, Space, Typography } from "antd";
import Container from "../components/Container";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div>
      <Container space={true}>
        <div style={{ marginTop: "5rem" }}>
          <center>
            <Typography.Title level={2}>Set New Password</Typography.Title>
          </center>
          <br />
          <form style={{ maxWidth: "315px", margin: "0 auto" }}>
            {/* <Input type="email" placeholder="Email" />
            <br />
            <br /> */}
            <Input type="password" placeholder="New Password" />
            <br />
            <br />
            <Input type="password" placeholder="Repeat New Password" />
            <br />
            <br />
            <Button htmlType="submit" type="primary" block>
              Save
            </Button>
            <br />
            <br />
            <center>
              <Space size="large">
                <p>
                  Remember password? <Link to="/login">Log In</Link>
                </p>
              </Space>
            </center>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
