const userModel = require("../models/userSchema");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const userExists = await userModel.findOne({
      email: req?.body?.email,
    });

    if (userExists) {
      return res.status(400).json({
        sucess: true,
        message: "User already exists",
      });
    }

    // Hashing usecase
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req?.body?.password, salt);
    req.body.password = hashPassword;

    // Creating user
    const user = await userModel.create(req?.body);
    await user.save();

    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    error.message = "User Already exists";
    next(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req?.body?.email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist, please register first",
      });
    }

    const validatePassword = await bcrypt.compare(
      req?.body?.password,
      user.password
    );

    if (!validatePassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        message: "Logged in successfully",
        success: true,
      });

    // res.status(200).json({
    //   success: true,
    //   message: "Login successful",
    //   data: token,
    // });
  } catch (error) {
    error.message = "Invalid credentials";
    next(error);
  }
};

const handleUserLogout = async (req, res) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const handleCurrentUser = async (req, res) => {
  try {
    const user = await userModel
      .findOne({
        email: req?.body?.email,
      })
      .select("-password");

    res.status(200).json({
      message: "User Details Fetched Successfully",
      user,
      success: true,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerUser,
  loginUser,
  handleCurrentUser,
  handleUserLogout,
};
