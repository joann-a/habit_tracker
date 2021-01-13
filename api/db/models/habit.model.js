const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  why: {
    type: String,
    minlength: 1,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  streak: {
    type: Number,
    default: 0,
  },
});

const Habit = mongoose.model("Habit", HabitSchema);

module.exports = { Habit };
