import React, { useState } from "react";
import { Button, Input, message, Space, Typography } from "antd";
import Container from "../components/Container";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password1: "",
    password2: "",
  });
  const { mutate } = useMutation(
    (data) => axios.post("/user/signup", { ...data }),
    {
      onError: (err) => message.error(err.response.data.message),
      onSuccess: (result) => {
        const { data } = result;
        message.success(data.message);
        setTimeout(() => {
          navigate(`/verify/${data.user._id}`);
        }, 1500);
      },
    }
  );

  const signupUser = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div>
      <Container space={true}>
        <div style={{ marginTop: "5rem" }}>
          <center>
            <Typography.Title level={2}>Sign Up</Typography.Title>
          </center>{" "}
          <br />
          <form
            onSubmit={signupUser}
            style={{ maxWidth: "315px", margin: "0 auto" }}
          >
            <Input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <br />
            <br />
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
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <br />
            <br />
            <Input.TextArea
              placeholder="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />{" "}
            <br />
            <br />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password1}
              onChange={(e) =>
                setFormData({ ...formData, password1: e.target.value })
              }
            />
            <br />
            <br />
            <Input
              type="password"
              placeholder="Repeat Password"
              value={formData.password2}
              onChange={(e) =>
                setFormData({ ...formData, password2: e.target.value })
              }
            />
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
