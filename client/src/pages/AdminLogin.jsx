import React, { useState } from "react";
import { Space, Button, Input, Typography, message } from "antd";
import Container from "../components/Container";
import { useMutation } from "react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const login = (data) => axios.post("/admin/login", data);

const AdminLogin = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation(login, {
    onError: (err) => {
      const data = err.response.data;

      if (data.notVerified) {
        message.error(data.message);
        setTimeout(() => {
          navigate(`/verify/${data.userId}`);
        }, 1500);
        return;
      }

      message.error(data.message);
    },
    onSuccess: (result) => {
      const { data } = result;
      message.success(data.message);
      setTimeout(() => {
        navigate(`/admin/inventory`);
      }, 1500);
    },
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div>
      <Container space={true}>
        <div style={{ marginTop: "5rem" }}>
          <center>
            <Typography.Title level={2}>Admin Log In</Typography.Title>
          </center>
          <br />
          <form
            onSubmit={handleLogin}
            style={{ maxWidth: "315px", margin: "0 auto" }}
          >
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <br />
            <br />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
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
              </Space>
            </center>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AdminLogin;
