import React from "react";
import Container from "../components/Container";
import { Button, Input, Space, Typography } from "antd";

const VerifyEmail = () => {
  return (
    <div>
      <Container space={true}>
        <div style={{ marginTop: "5rem" }}>
          <center>
            <Typography.Title level={2}>Email Verification</Typography.Title>
          </center>
          <br />
          <form style={{ maxWidth: "315px", margin: "0 auto" }}>
            <Typography>Enter the code sent to your email</Typography>
            <br />
            <Input type="password" />
            <br />
            <br />
            <Button htmlType="submit" type="primary" block>
              Verify
            </Button>
            <br />
            <br />
            {/* <center>
              <Space size="large">
                <p>
                  Remember password? <Link to="/login">Log In</Link>
                </p>
              </Space>
            </center> */}
          </form>
        </div>
      </Container>
    </div>
  );
};

export default VerifyEmail;
