import React from "react";

import { useNavigate } from "react-router-dom";
import { GetCurrentUser, HandleUserLogout } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

import { setMessage } from "../store/ui";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.ui.loader);
  const { user } = useSelector((state) => state.user);

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
      {!loading && (
        <>
          <div>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
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
