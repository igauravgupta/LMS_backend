const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URL}/lms`);
    console.log("Database Connection Successfully");
  } catch (error) {
    console.error(error);
  }
};

module.exports = dbConnect;
