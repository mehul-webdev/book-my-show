import React, { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { GetCurrentUser, HandleUserLogout } from "../api/user";
import { useDispatch } from "react-redux";
import { Button } from "antd";

import { setMessage } from "../store/ui";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();

  const getValidUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await GetCurrentUser();
      if (response.success) {
        setUserInfo(response.user);
      } else {
        throw new Error("Unauthorized");
      }
    } catch (err) {
      navigate("/login");
      dispatch(
        setMessage({
          type: "error",
          // eslint-disable-next-line no-constant-binary-expression
          content: "Unauthorized access. Please login." || err.message,
        })
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    getValidUser();
  }, [getValidUser]);

  const handleLogout = async () => {
    const response = await HandleUserLogout();

    if (response.success) {
      navigate("/login");
      dispatch(
        setMessage({
          type: "success",
          content: response.message,
        })
      );
    }
  };

  return (
    <>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <div>
            <p>Name: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
          </div>
          <Button type="primary" size="small" onClick={handleLogout}>
            Logout{" "}
          </Button>
        </>
      )}
    </>
  );
};

export default Home;
