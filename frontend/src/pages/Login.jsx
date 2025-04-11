import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../api/user";

import { useDispatch } from "react-redux";
import { setMessage } from "../store/ui";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);

      if (response?.success) {
        dispatch(
          setMessage({
            type: "success",
            content: response?.message || "Login Success",
          })
        );
        localStorage.setItem("tokenForBMS", response?.data);
        navigate("/");
      } else {
        dispatch(
          setMessage({
            type: "warning",
            content: response?.message || "Invalid Credentials",
          })
        );
      }
    } catch (error) {
      dispatch(setMessage({ type: "error", content: error?.message }));
    }
  };
  return (
    <div className="App-header">
      <main className="main-area mw-500 text-center px-3">
        <section>
          <h1>Login to BookMyShow</h1>
        </section>
        <section>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Email is Required" }]}
            >
              <Input
                id="email"
                type="email"
                placeholder="Enter your Email"
              ></Input>
            </Form.Item>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is Required" }]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
              ></Input>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                htmlFor="submit"
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </section>
        <section>
          <p>
            New User ? <Link to="/register">Register Here</Link>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Login;
