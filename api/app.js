const express = require("express");
const app = express();
const port = 7000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { mongoose } = require("./db/mongoose");

const { HabitList, Habit } = require("./db/models/index");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// start server and listen to port 7000 for connections
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

// Post /habitlist
// Purpose: create a habitslist
app.post("/habitlist", (req, res) => {
  // create a new habitlist and return the list back to user
  let title = req.body.title;
  console.log(`title is: ${title}`);

  let newHabitlist = new HabitList({
    title,
  });

  newHabitlist
    .save()
    .then((habitsDoc) => {
      res.send(habitsDoc);
      res.end();
    })
    .catch((e) => {
      console.log(e);
      res.send("error in posting habitlist");
    });
});

// GET /habitlist
// Purpose: get all habitlists
app.get("/habitlist", (req, res) => {
  // create a new habitlist and return the list back to user
  HabitList.find().then((habitlists) => {
    res.send(habitlists);
  });
});

/* PATCH /lists/:id
   Purpose: update a habitlist */
app.patch("/lists/:id", (req, res) => {
  // update habitlist with the new values specified in the JSON body of the request
  List.findOneAndUpdate(
    { _id: req.params.id },
    // MongoDB key word set, updates list that it finds using the body
    {
      $set: req.body,
    }
  ).then(() => res.sendStatus(200));
});

/* GET /habitlist/:habitlistId/habits 
Purpose: get all habits in a specific habitlist */
app.get("/habitlist/:habitlistId/habits", (req, res) => {
  // We want to return all tasks that belong to a specific list (specified by listId)
  Habit.find({
    _habitlistId: req.params.habitlistId,
  })
    .then((habits) => {
      res.send(habits);
    })
    .catch((e) => {
      res.send("could not get habits for a specific habit list");
    });
});

// GET /habitlist/:habitlistId/habits/habitId
// Purpose: get one habit in a specific habitlist
app.get("/habitlist/:habitlistId/habits/habitId ", (req, res) => {
  Task.findOne({
    _habitId: req.params.habitId,
    __habitlistId: req.params.habitlistId,
  }).then((habit) => {
    res.send(habit);
  });
});

/* POST /habitlist/:habitlistId/habits
Purpose: create new habits in a specific habitlist */
app.post("/habitlist/:habitlistId/habits", (req, res) => {
  // We want to create a new task in a list specified by listId
  let newHabit = new Habit({
    name: req.body.name,
    _habitlistId: req.params.habitlistId,
  });

  console.log(`newhabit title: ${newHabit.title}`);
  newHabit
    .save()
    .then((newHabitDoc) => {
      res.send(newHabitDoc);
    })
    .catch((e) => {
      console.log(e);
      res.send("Could not create new habit");
    });
});

/* PATCH /habitlist/:habitlistId/habits/habitId
Purpose: update an existing habit */
app.patch("/habitlist/:habitlistId/habits/:habitId", (req, res) => {
  Habit.findOneAndUpdate(
    {
      _id: req.params.habitId,
      _habitlistId: req.params.habitlistId,
    },
    {
      $set: req.body,
    }
  )
    .then(() => {
      res.sendStatus(200);
    })
    .catch((e) => {
      console.log(e);
      res.send("Cound not update habit");
    });
});

app.delete("/lists/:id/habits/:habitId", (req, res) => {
  Habit.findOneAndRemove(
    {
      _id: req.params.id,
      _habitId: req.params.habitId,
    },
    {
      $set: req.body,
    }
  )
    .then((removedHabitDoc) => {
      res.send(removedHabitDoc);
    })
    .catch((e) => {
      console.log(e);
      res.send("cound not delete habit");
    });
});
