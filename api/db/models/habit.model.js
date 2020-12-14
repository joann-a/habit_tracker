const mongoose = require("mongoose");
const { stringify } = require("querystring");

const HabitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  _habitlistId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const Habit = mongoose.model("Habit", HabitSchema);

module.exports = { Habit };
