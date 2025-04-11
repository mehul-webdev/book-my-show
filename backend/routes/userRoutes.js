const express = require("express");
const {
  registerUser,
  loginUser,
  handleCurrentUser,
  handleUserLogout,
} = require("../controllers/userController");
const { validateJWTToken } = require("../middlewares/authorizationMiddleWare");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/logout", handleUserLogout);
router.get("/getCurrentUser", validateJWTToken, handleCurrentUser);

module.exports = router;
