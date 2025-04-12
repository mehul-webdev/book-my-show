const userModel = require("../models/userSchema");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../middlewares/sendEmails");

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

const loginUser = async (req, res, next) => {
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

    // Send Email

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);
    user.otp = hashedOtp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    const mailReq = {
      body: {
        to: req.body.email,
        subject: "Your OTP for Login",
        html: `<h3>Hello ${
          user.name || "User"
        },</h3><p>Your OTP is: <strong>${otp}</strong></p><p>This OTP is valid for 5 minutes.</p>`,
      },
    };

    sendEmail(mailReq, res, (err) => {
      if (err) return next(err);
      res.status(200).json({
        success: true,
        message: "Correct password. OTP has been sent to your email.",
      });
    });
  } catch (error) {
    // error.message = "Something Went wrong";
    console.log(error);
    next(error);
  }
};

const handleValidateOtp = async (req, res, next) => {
  try {
    const { otp, email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user || !user.otp || !user.otpExpires) {
      return res
        .status(400)
        .json({ message: "OTP not requested or user not found." });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid OTP",
        success: false,
      });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

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

    // return res.status(200).json({
    //   message: "Login Successful",
    //   success: true,
    // });
  } catch (e) {
    next(e);
  }

  res.status(200).json({
    message: "Valid OTP",
    success: true,
  });
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

const handleCheckUserLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Please login",
      });
    }

    res.status(200).json({
      success: true,
      message: "Already Logged In",
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
  handleValidateOtp,
  handleCheckUserLoggedIn,
};
