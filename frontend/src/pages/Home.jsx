import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../api/user";
import { useDispatch } from "react-redux";
import { Button } from "antd";

const Home = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const getValidUser = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUserInfo(response?.data);
      }
    } catch (e) {
      dispatch(
        setMessage({
          type: "error",
          content: "UnAuthorized",
        })
      );
    }
  };

  useEffect(() => {
    if (localStorage.getItem("tokenForBMS")) {
      getValidUser();
      return;
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tokenForBMS");
    navigate("/login");
  };

  return (
    <div>
      <Link to="/login">Login</Link>
      <Button onClick={handleLogout}>Logout </Button>
    </div>
  );
};

export default Home;
