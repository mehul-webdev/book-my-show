import moment from "moment";

export const tableHeadings = [
  {
    key: "poster",
    title: "Poster",
    dataIndex: "poster",
    render: (text, data) => {
      return (
        <img
          src={data.poster}
          alt="Movie Poster"
          width="75"
          height="115"
          style={{
            objectFit: "cover",
          }}
        />
      );
    },
  },
  {
    key: "movieName",
    title: "Movie Name",
    dataIndex: "movieName",
  },
  {
    key: "description",
    title: "Description",
    dataIndex: "description",
  },
  {
    key: "duration",
    title: "Duration",
    dataIndex: "duration",
    render: (text) => {
      return `${text} mins`;
    },
  },
  {
    key: "genre",
    title: "Genre",
    dataIndex: "genre",
  },
  {
    key: "language",
    title: "Language",
    dataIndex: "language",
  },
  {
    key: "releaseDate",
    title: "Release Date",
    dataIndex: "releaseDate",
    render: (text, data) => {
      return moment(data.releaseDate).format("MM-DD-YYYY");
    },
  },
];
