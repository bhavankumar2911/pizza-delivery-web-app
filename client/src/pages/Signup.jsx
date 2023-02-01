import React from "react";
import { Button, Input, Space, Typography } from "antd";
import Container from "../components/Container";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Container space={true}>
        <div style={{ marginTop: "5rem" }}>
          <center>
            <Typography.Title level={2}>Sign Up</Typography.Title>
          </center>{" "}
          <br />
          <form style={{ maxWidth: "315px", margin: "0 auto" }}>
            <Input type="email" placeholder="Email" />
            <br />
            <br />
            <Input type="password" placeholder="Password" />
            <br />
            <br />
            <Input type="password" placeholder="Repeat Password" />
            <br />
            <br />
            <Button htmlType="submit" type="primary" block>
              Sign Up
            </Button>
            <br />
            <br />
            <center>
              <Space size="large">
                <p>
                  Have an account? <Link to="/login">Log In</Link>
                </p>
              </Space>
            </center>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
