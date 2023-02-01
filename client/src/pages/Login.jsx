import React from "react";
import { Button, Input, Space, Typography } from "antd";
import Container from "../components/Container";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <Container space={true}>
        <div style={{ marginTop: "5rem" }}>
          <center>
            <Typography.Title level={2}>Log In</Typography.Title>
          </center>
          <br />
          <form style={{ maxWidth: "315px", margin: "0 auto" }}>
            <Input type="email" placeholder="Email" />
            <br />
            <br />
            <Input type="password" placeholder="Password" />
            <br />
            <br />
            <Button htmlType="submit" type="primary" block>
              Login
            </Button>
            <br />
            <br />
            <center>
              <Space size="large">
                <p>
                  <Link to="/forgot-password">Forgot Password?</Link>
                </p>
                <p>
                  New User? <Link to="/signup">Sign Up</Link>
                </p>
              </Space>
            </center>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
