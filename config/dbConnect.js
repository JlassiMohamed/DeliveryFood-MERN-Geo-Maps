const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    // console.log(connection)
    console.log(`💽 Database ${connection.connection.name} is connected..`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
