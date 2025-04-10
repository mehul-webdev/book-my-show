const userModel = require("../models/userSchema");

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

    if (req?.body?.password !== user.password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    error.message = "Invalid credentials";
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
