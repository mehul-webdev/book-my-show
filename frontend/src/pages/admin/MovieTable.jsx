import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Table } from "antd";

import { hideLoading, setMessage, showLoading } from "../../store/ui";

import MovieForm from "./MovieForm";
import { tableHeadings } from "./helper";
import { getAllMovies } from "../../api/movie";
// import { tableHeadings } from "./helper";

const MovieList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);

  const getData = useCallback(async () => {
    console.log("here working data");
    try {
      dispatch(showLoading());
      const response = await getAllMovies();

      if (response.success) {
        setMovies(response?.data);
      }
    } catch (err) {
      dispatch(
        setMessage({
          type: "error",
          content: "Error while fetching Table data",
        })
      );
    } finally {
      dispatch(hideLoading());
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          Add Movie
        </Button>
      </div>

      <Table columns={tableHeadings} dataSource={movies} />
      {isModalOpen && (
        <MovieForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default MovieList;
