const express = require("express");
const {
  registerUser,
  loginUser,
  handleCurrentUser,
} = require("../controllers/userController");
const { validateJWTToken } = require("../middlewares/authorizationMiddleWare");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/getCurrentUser", validateJWTToken, handleCurrentUser);

module.exports = router;
