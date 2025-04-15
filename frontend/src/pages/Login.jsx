import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Button, Flex, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { handleCheckUserLoggedIn, LoginUser, OtpCheck } from "../api/user";

import { useDispatch } from "react-redux";
import { setMessage } from "../store/ui";

import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import Message from "../components/Message/Message";

const Login = () => {
  const dispatch = useDispatch();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isOtpCorrect, setIsOtpCorrect] = useState({
    status: true,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setIsSubmitting(true);
      const response = await LoginUser(values);

      if (response?.success) {
        dispatch(
          setMessage({
            type: "success",
            content: response?.message || "Correct Password",
          })
        );
        setShowOtpInput(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitOtp = async (values) => {
    const { otp, email } = values;

    if (otp && otp.length === 6) {
      setIsSubmitting(true);
      try {
        const response = await OtpCheck({ otp, email });

        if (response.success) {
          dispatch(
            setMessage({
              type: "success",
              content: response?.message || "Correct Password",
            })
          );
          setIsOtpCorrect({
            status: true,
            message: "",
          });
        } else {
          setIsOtpCorrect({
            status: false,
            message: response.message,
          });
          throw new Error(response.message);
        }

        navigate("/");
      } catch (e) {
        dispatch(
          setMessage({
            type: "error",
            content: e?.message || "Try Again",
          })
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsOtpCorrect({
        status: false,
        message: "OTP Should be 6 digits",
      });
    }
  };

  const handleLoginStatus = useCallback(async () => {
    try {
      const response = await handleCheckUserLoggedIn();

      if (response.success) {
        navigate("/");
        dispatch(
          setMessage({
            type: "success",
            content: response?.message || "You logged in",
          })
        );
      }
    } catch (e) {
      console.log("Error while checking login status", e);
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    handleLoginStatus();
  }, [navigate, handleLoginStatus]);

  return (
    <div className="App-header">
      <Message />
      <main className="main-area mw-500 text-center px-3">
        <section>
          <h1>Login to BookMyShow</h1>
        </section>
        <section>
          <Form
            layout="vertical"
            onFinish={showOtpInput ? submitOtp : onFinish}
          >
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
              <Input.Password
                id="password"
                placeholder="Enter your Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            {showOtpInput && (
              <Form.Item
                label="Enter OTP"
                htmlFor="otp"
                name="otp"
                className="d-block"
                validateStatus={!isOtpCorrect.status ? "error" : ""}
                help={!isOtpCorrect.status ? isOtpCorrect.message : ""}
              >
                <Input.OTP
                  style={{ display: "flex", gap: "40px" }}
                  id="otp"
                  inputMode="numeric"
                />
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                block
                htmlFor="submit"
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
                disabled={isSubmitting}
              >
                {isSubmitting && <Spin />}
                {!isSubmitting && showOtpInput && "Enter OTP"}
                {!isSubmitting && !showOtpInput && "Login"}
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
