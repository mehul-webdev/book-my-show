const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  // admin - bookmyshow onboarding of theathre and movies
  // parner - they will be able to add the movies and theatres
  // user - normal user who can book the tickets
  role: {
    type: String,
    default: "user",
    enum: ["admin", "partner", "user"],
    required: true,
  },
});

const users = mongoose.model("users", userSchema);
module.exports = users;
