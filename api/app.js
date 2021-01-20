const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("./db/mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { Habit } = require("./db/models/index");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// parse application/json
app.use(bodyParser.json());

// CORS headers middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});
app.use(cors());

// start server and listen to port 3000 for connections
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

/*-------------------------------- apis for habits ------------------------------------------*/

// GET /habits
// Purpose: get one habit - may not be needed currently
/* app.get("/habitlist/:habitlistId/habits/habitId", (req, res) => {
  Habit.findOne({
    _habitId: req.params.habitId,
    __habitlistId: req.params.habitlistId,
  }).then((habit) => {
    res.send(habit);
  });
});
 */

// the get method arrives at endpoint, the callback function is exe when the endpoint is reached
app.get("/habits", async (req, res) => {
  try {
    const habits = await Habit.find();
    console.log(habits);
    res.json(habits);
  } catch (err) {
    res.send({ message: err });
    console.log("error");
  }
});

app.get("/edit-habit/:habitId", async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.habitId);
    res.json(habit);
  } catch (err) {
    res.json({ message: err });
  }
});

/* POST /habits
Purpose: create new habit */
app.post("/new-habit", (req, res) => {
  console.log("about to make it");
  // We want to create a new task in a list specified by listId
  let newHabit = new Habit({
    name: req.body.name,
    why: req.body.why,
  });

  console.log(`newhabit name: ${newHabit.name}`);
  newHabit
    .save()
    .then(() => {
      res.send({ message: "successfully created new habit" });
    })
    .catch((e) => {
      console.log(e);
      res.send("Could not create new habit");
    });
});

app.post("/habits/:id", (req, res) => {
  console.log("about to log event");
});

/* PATCH /habits/habitId
Purpose: update an existing habit */
app.patch("/habits/:habitId", (req, res) => {
  console.log("reached api call");
  Habit.findOneAndUpdate(
    {
      _id: req.params.habitId,
    },
    {
      $set: req.body,
    }
  )
    .then((data) => {
      console.log("successfully updated");
      // the data being sent back is from the req *before* being updated
      res.status(200).send(data);
    })
    .catch((e) => {
      console.log(e);
      res.send("Cound not update habit");
    });
});

app.delete("/habits/:habitId", (req, res) => {
  Habit.findOneAndRemove({
    _id: req.params.habitId,
  })
    .then(() => {
      res.status(200).send({ message: "successfully removed" });
    })
    .catch((e) => {
      console.log(e);
      res.send("could not delete habit");
    });
});
