import React, { useState } from "react";
import Container from "../components/Container";
import { Button, Input, Typography, message } from "antd";
import { useMutation } from "react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate } = useMutation(
    (data) => axios.post(`/user/verify-email/${id}`, data),
    {
      onError: (err) => {
        message.error(err.response.data.message);
      },
      onSuccess: (result) => {
        const { data } = result;
        message.success(data.message);
        setTimeout(() => {
          navigate(`/login`);
        }, 1500);
      },
    }
  );
  const [code, setCode] = useState("");

  const verifyEmail = (e) => {
    e.preventDefault();
    mutate({ code });
  };

  return (
    <div>
      <Container space={true}>
        <div style={{ marginTop: "5rem" }}>
          <center>
            <Typography.Title level={2}>Email Verification</Typography.Title>
          </center>
          <br />
          <form
            onSubmit={verifyEmail}
            style={{ maxWidth: "315px", margin: "0 auto" }}
          >
            <Typography>Enter the code sent to your email</Typography>
            <br />
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <br />
            <br />
            <Button htmlType="submit" type="primary" block>
              Verify
            </Button>
            <br />
            <br />
          </form>
        </div>
      </Container>
    </div>
  );
};

export default VerifyEmail;
