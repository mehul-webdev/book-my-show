import React from "react";
import { Outlet } from "react-router-dom";
import Message from "../components/Message/Message";

const Layout = () => {
  return (
    <>
      <Message />
      <Outlet />
    </>
  );
};

export default Layout;
