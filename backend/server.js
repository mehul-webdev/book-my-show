const express = require("express");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const errorHandler = require("./middlewares/errorHandler");

require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/bms/v1/users", userRoutes);
app.use("/bms/v1/movies", movieRouter);
connectDb();

const port = process.env.PORT || 5000;
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
