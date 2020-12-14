// used to connect to MongoDB database

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/HabitTracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoDb success");
  })
  .catch((e) => {
    console.log("Error connecting to MongoDB");
    console.log(e);
  });

module.exports = mongoose;
