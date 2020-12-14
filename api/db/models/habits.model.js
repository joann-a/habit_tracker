const mongoose = require("mongoose");

const HabitListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
});

const HabitList = mongoose.model("HabitList", HabitListSchema);

module.exports = { HabitList };
