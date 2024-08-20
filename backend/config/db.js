const mongoose = require("mongoose");

const db_connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to mongoose");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = db_connection;
