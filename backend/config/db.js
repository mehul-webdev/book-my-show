const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URL);

    if (res) {
      console.log("MongoDB connected successfully");
    }
  } catch (e) {
    console.log("Error while connecting with mongoDB", e.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
