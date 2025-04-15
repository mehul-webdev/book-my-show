const {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");
const { validateJWTToken } = require("../middlewares/authorizationMiddleWare");

const router = require("express").Router();

router.post("/addMovie", validateJWTToken, addMovie);
router.get("/getAllMovies", validateJWTToken, getAllMovies);
router.patch("/updateMovie", validateJWTToken, updateMovie);
router.delete("/deleteMovie", validateJWTToken, deleteMovie);

module.exports = router;
