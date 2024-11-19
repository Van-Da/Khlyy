const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/users");
    console.log("Kết nối MongoDB thành công");
  } catch (err) {
    console.error("404 MongoDB:", err);
  }
};

module.exports = connectDB;
