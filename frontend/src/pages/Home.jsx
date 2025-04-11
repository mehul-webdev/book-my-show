import React, { useCallback, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { GetCurrentUser, HandleUserLogout } from "../api/user";
import { useDispatch } from "react-redux";
import { Button } from "antd";

import { setMessage } from "../store/ui";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getValidUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await GetCurrentUser();
      if (response.success) {
        console.log("jhello");
      } else {
        throw new Error("Unauthorized");
      }
    } catch (err) {
      navigate("/login");
      console.log("error is", err);
      dispatch(
        setMessage({
          type: "error",
          content: "Unauthorized access. Please login.",
        })
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    console.log("inside effect");
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
        <div>
          <Link to="/login">Login</Link>
          <Button onClick={handleLogout}>Logout </Button>
        </div>
      )}
    </>
  );
};

export default Home;
