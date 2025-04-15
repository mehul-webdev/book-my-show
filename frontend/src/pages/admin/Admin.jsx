import React from "react";
import MovieList from "./MovieTable";
import TheatreTable from "./TheatreTable";
import { Tabs } from "antd";

const Admin = () => {
  const tabItems = [
    {
      key: "movies",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "theatre",
      label: "Theatres",
      children: <TheatreTable />,
    },
  ];

  const handleTabChange = () => {
    console.log("here working");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Tabs
        defaultActiveKey="movies"
        items={tabItems}
        onChange={handleTabChange}
      />
    </div>
  );
};

export default Admin;
