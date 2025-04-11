import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../api/user";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const getValidUser = async () => {
    try {
      const response = await GetCurrentUser();
      setUserInfo(response?.data);
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
      console.log("herte working");
      getValidUser();
      return;
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
