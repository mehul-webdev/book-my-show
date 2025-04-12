const express = require("express");
const {
  registerUser,
  loginUser,
  handleCurrentUser,
  handleUserLogout,
  handleValidateOtp,
  handleCheckUserLoggedIn,
} = require("../controllers/userController");
const { validateJWTToken } = require("../middlewares/authorizationMiddleWare");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/validateOtp", handleValidateOtp);
router.post("/logout", handleUserLogout);
router.get("/getCurrentUser", validateJWTToken, handleCurrentUser);
router.get("/userLoggedIn", handleCheckUserLoggedIn);

module.exports = router;
