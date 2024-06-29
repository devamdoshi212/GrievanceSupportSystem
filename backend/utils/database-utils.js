const mongoose = require("mongoose");

async function dbConnection() {
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    await mongoose.connect(process.env.MONGODB_URI);
  }
}

module.exports = {
  dbConnection,
};
